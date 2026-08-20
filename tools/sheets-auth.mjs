// Google service-account auth shared by the sheets tools
// (tools/audit-stores.mjs and tools/sheets-sync/push-summary.mjs).
// Resolution order for the credentials JSON:
//   GOOGLE_SERVICE_ACCOUNT_JSON env var → .env.local → Cockpit default path.
import { existsSync, readFileSync } from "node:fs";
import { createPrivateKey, sign } from "node:crypto";
import path from "node:path";

export function credentialsPath(root) {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const envLocal = path.join(root, ".env.local");
  if (existsSync(envLocal)) {
    for (const line of readFileSync(envLocal, "utf8").split(/\r?\n/)) {
      const m = line.match(/^GOOGLE_SERVICE_ACCOUNT_JSON=(.+)$/);
      if (m) return m[1].trim().replace(/^["']|["']$/g, "");
    }
  }
  const fallback = "c:/Users/ksait/cockpits/personal-cockpit/.secrets/gcp/service-account.json";
  if (existsSync(fallback)) return fallback;
  console.error(
    "service account JSON が見つかりません。環境変数 GOOGLE_SERVICE_ACCOUNT_JSON か .env.local にパスを設定してください。"
  );
  process.exit(2);
}

/** scope: "https://www.googleapis.com/auth/spreadsheets[.readonly]" */
export async function accessToken(root, scope) {
  const creds = JSON.parse(readFileSync(credentialsPath(root), "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const b64u = (s) => Buffer.from(s).toString("base64url");
  const signingInput =
    b64u(JSON.stringify({ alg: "RS256", typ: "JWT" })) +
    "." +
    b64u(
      JSON.stringify({
        iss: creds.client_email,
        scope,
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
      })
    );
  const sig = sign("RSA-SHA256", Buffer.from(signingInput), createPrivateKey(creds.private_key)).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signingInput + "." + sig,
    }),
  });
  if (!res.ok) {
    console.error("token error:", await res.text());
    process.exit(2);
  }
  return (await res.json()).access_token;
}
