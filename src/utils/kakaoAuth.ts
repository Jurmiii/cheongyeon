import { supabase } from "../lib/supabase";

const OAUTH_REDIRECT_KEY = "cheongyeon-oauth-redirect";
const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_OAUTH_SCOPES = "profile_nickname profile_image";

function resolveSiteUrl() {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  const runtimeOrigin =
    typeof window !== "undefined" ? window.location.origin.replace(/\/$/, "") : "";

  const isLocalConfigured = configuredSiteUrl?.includes("localhost") ?? false;
  const isLocalRuntime = runtimeOrigin.includes("localhost");

  if (configuredSiteUrl && !(isLocalConfigured && !isLocalRuntime)) {
    return configuredSiteUrl;
  }

  return runtimeOrigin || configuredSiteUrl || "";
}

export function getKakaoRedirectUri() {
  return `${resolveSiteUrl()}/auth/kakao/callback`;
}

function getKakaoAuthApiUrl() {
  const configured = import.meta.env.VITE_KAKAO_AUTH_API_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  return `${resolveSiteUrl()}/api/kakao-auth`;
}

export async function signInWithKakao(postLoginPath = "/") {
  const restApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

  if (!restApiKey) {
    throw new Error("VITE_KAKAO_REST_API_KEY is not configured.");
  }

  sessionStorage.setItem(
    OAUTH_REDIRECT_KEY,
    postLoginPath.startsWith("/") ? postLoginPath : "/",
  );

  const params = new URLSearchParams({
    client_id: restApiKey,
    redirect_uri: getKakaoRedirectUri(),
    response_type: "code",
    scope: KAKAO_OAUTH_SCOPES,
  });

  window.location.assign(`${KAKAO_AUTHORIZE_URL}?${params.toString()}`);
}

export async function completeKakaoLogin(code: string) {
  const response = await fetch(getKakaoAuthApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      redirectUri: getKakaoRedirectUri(),
    }),
  });

  const data = (await response.json()) as {
    token_hash?: string;
    email?: string;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error || "Kakao auth API failed.");
  }

  if (!data || typeof data !== "object" || data.error) {
    throw new Error(data.error || "Kakao auth API failed.");
  }

  const tokenHash = data.token_hash;
  const email = data.email;

  if (typeof tokenHash !== "string" || typeof email !== "string") {
    throw new Error("Invalid session response from Kakao auth function.");
  }

  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "email",
  });

  if (verifyError) {
    throw verifyError;
  }
}

export function readOAuthRedirectPath() {
  const value = sessionStorage.getItem(OAUTH_REDIRECT_KEY);
  sessionStorage.removeItem(OAUTH_REDIRECT_KEY);

  return value && value.startsWith("/") ? value : "/";
}

export async function resolveLoginIdFromSession() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("login_id")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.login_id) {
    return profile.login_id;
  }

  const metadata = user.user_metadata;

  return (
    metadata?.nickname ||
    metadata?.user_name ||
    metadata?.name ||
    metadata?.full_name ||
    "user"
  );
}
