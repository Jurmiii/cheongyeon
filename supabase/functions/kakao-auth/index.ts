import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function getSyntheticEmail(kakaoId: string) {
  return `kakao_${kakaoId}@cheongyeon.auth`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const { code, redirectUri } = await req.json();

    if (!code || typeof code !== "string") {
      return jsonResponse({ error: "Authorization code is required." }, 400);
    }

    if (!redirectUri || typeof redirectUri !== "string") {
      return jsonResponse({ error: "redirectUri is required." }, 400);
    }

    const kakaoRestApiKey = Deno.env.get("KAKAO_REST_API_KEY");
    const kakaoClientSecret = Deno.env.get("KAKAO_CLIENT_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!kakaoRestApiKey || !kakaoClientSecret || !supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: "Server auth configuration is incomplete." }, 500);
    }

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
      return jsonResponse(
        {
          error: tokenData.error_description || tokenData.error || "Failed to exchange Kakao token.",
        },
        400,
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
      return jsonResponse({ error: "Failed to load Kakao profile." }, 400);
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
      kakaoUser.properties?.thumbnail_image_url ||
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
      const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(syntheticEmail);
      userId = existingUser.user?.id ?? null;
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
        return jsonResponse({ error: updateError.message }, 400);
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
        return jsonResponse({ error: createError?.message || "Failed to create user." }, 400);
      }

      userId = createdUser.user.id;
    }

    await supabaseAdmin.from("profiles").update({
      kakao_id: kakaoId,
      name: nickname,
      avatar_url: avatarUrl,
      auth_provider: "kakao",
    }).eq("id", userId);

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: syntheticEmail,
    });

    if (linkError || !linkData.properties?.hashed_token) {
      return jsonResponse({ error: linkError?.message || "Failed to create session." }, 400);
    }

    return jsonResponse({
      token_hash: linkData.properties.hashed_token,
      email: syntheticEmail,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return jsonResponse({ error: message }, 500);
  }
});
