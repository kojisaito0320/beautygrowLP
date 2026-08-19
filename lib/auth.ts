import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_PREFIX = "bg_ref_";
const SESSION_DAYS = 30;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function cookieName(slug: string): string {
  return COOKIE_PREFIX + slug;
}

export function sessionMaxAge(): number {
  return SESSION_DAYS * 24 * 60 * 60;
}

/** Create a signed session cookie value for a partner. */
export function createSession(slug: string): string {
  const exp = Date.now() + sessionMaxAge() * 1000;
  const payload = Buffer.from(JSON.stringify({ p: slug, exp })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Verify a session cookie value; returns true only for the same partner and unexpired. */
export function verifySession(value: string | undefined, slug: string): boolean {
  if (!value) return false;
  const dot = value.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.p === slug && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

/** Constant-time password check against the partner's env var. */
export function checkPassword(input: string, passwordEnv: string): boolean {
  const expected = process.env[passwordEnv];
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  // timingSafeEqual requires equal lengths; compare against self to keep timing flat
  if (a.length !== b.length) {
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}
