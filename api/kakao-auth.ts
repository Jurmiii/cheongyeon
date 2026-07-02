import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

interface KakaoTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface KakaoUserResponse {
  id: number;
  properties?: {
    nickname?: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account?: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
  };
}

function getSyntheticEmail(kakaoId: string) {
  return `kakao_${kakaoId}@cheongyeon.auth`;
}

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function getMissingEnvNames(): string[] {
  const missing: string[] = ["KAKAO_REST_API_KEY", "KAKAO_CLIENT_SECRET", "SUPABASE_SERVICE_ROLE_KEY"].filter(
    (name) => !getEnv(name),
  );

  if (!getEnv("SUPABASE_URL") && !getEnv("VITE_SUPABASE_URL")) {
    missing.push("SUPABASE_URL");
  }

  return missing;
}

async function handleKakaoAuth(body: { code?: string; redirectUri?: string }) {
  const { code, redirectUri } = body;

  if (!code || typeof code !== "string") {
    throw new Error("Authorization code is required.");
  }

  if (!redirectUri || typeof redirectUri !== "string") {
    throw new Error("redirectUri is required.");
  }

  const missingEnv = getMissingEnvNames();
  if (missingEnv.length > 0) {
    throw new Error(`Server auth configuration is incomplete: ${missingEnv.join(", ")}`);
  }

  const kakaoRestApiKey = getEnv("KAKAO_REST_API_KEY")!;
  const kakaoClientSecret = getEnv("KAKAO_CLIENT_SECRET")!;
  const supabaseUrl = getEnv("SUPABASE_URL") || getEnv("VITE_SUPABASE_URL")!;
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY")!;

  const tokenParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: kakaoRestApiKey,
    client_secret: kakaoClientSecret,
    redirect_uri: redirectUri,
    code,
  });

  const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: tokenParams.toString(),
  });

  const tokenData = (await tokenResponse.json()) as KakaoTokenResponse;

  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error(
      tokenData.error_description || tokenData.error || "Failed to exchange Kakao token.",
    );
  }

  const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const kakaoUser = (await userResponse.json()) as KakaoUserResponse;

  if (!userResponse.ok || !kakaoUser.id) {
    throw new Error("Failed to load Kakao profile.");
  }

  const kakaoId = String(kakaoUser.id);
  const nickname =
    kakaoUser.kakao_account?.profile?.nickname ||
    kakaoUser.properties?.nickname ||
    `user${kakaoId.slice(-4)}`;
  const avatarUrl =
    kakaoUser.kakao_account?.profile?.profile_image_url ||
    kakaoUser.properties?.profile_image ||
    kakaoUser.kakao_account?.profile?.thumbnail_image_url ||
    kakaoUser.properties?.thumbnail_image ||
    null;

  const syntheticEmail = getSyntheticEmail(kakaoId);
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  let userId: string | null = null;

  const { data: existingProfile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("kakao_id", kakaoId)
    .maybeSingle();

  if (existingProfile?.id) {
    userId = existingProfile.id;
  } else {
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    userId = listData?.users.find((user) => user.email === syntheticEmail)?.id ?? null;
  }

  const userMetadata = {
    nickname,
    user_name: nickname,
    name: nickname,
    avatar_url: avatarUrl,
    kakao_id: kakaoId,
  };

  if (userId) {
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: userMetadata,
    });

    if (updateError) {
      throw new Error(updateError.message);
    }
  } else {
    const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: syntheticEmail,
      email_confirm: true,
      user_metadata: userMetadata,
      app_metadata: {
        provider: "kakao",
        providers: ["kakao"],
      },
    });

    if (createError || !createdUser.user) {
      throw new Error(createError?.message || "Failed to create user.");
    }

    userId = createdUser.user.id;
  }

  await supabaseAdmin
    .from("profiles")
    .update({
      kakao_id: kakaoId,
      name: nickname,
      avatar_url: avatarUrl,
      auth_provider: "kakao",
    })
    .eq("id", userId);

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email: syntheticEmail,
  });

  if (linkError || !linkData.properties?.hashed_token) {
    throw new Error(linkError?.message || "Failed to create session.");
  }

  return {
    token_hash: linkData.properties.hashed_token,
    email: syntheticEmail,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body =
      req.body && typeof req.body === "object"
        ? req.body
        : typeof req.body === "string" && req.body.length > 0
          ? JSON.parse(req.body)
          : {};

    const data = await handleKakaoAuth(body);
    res.status(200).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    res.status(400).json({ error: message });
  }
}
