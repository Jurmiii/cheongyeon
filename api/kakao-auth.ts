import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleKakaoAuth } from "./_lib/kakaoAuthHandler";

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
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const data = await handleKakaoAuth(body);
    res.status(200).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    res.status(400).json({ error: message });
  }
}
