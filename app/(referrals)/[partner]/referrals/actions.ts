"use server";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getPartner } from "@/content/partners";
import { checkPassword, cookieName, createSession, sessionMaxAge } from "@/lib/auth";

export async function login(slug: string, formData: FormData) {
  const config = getPartner(slug);
  if (!config?.referrals) notFound();

  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password, config.referrals.passwordEnv)) {
    // small fixed delay to blunt brute-force attempts
    await new Promise((r) => setTimeout(r, 400));
    redirect(`/${slug}/referrals?e=1`);
  }

  const store = await cookies();
  store.set(cookieName(slug), createSession(slug), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: sessionMaxAge(),
    path: "/",
  });
  redirect(`/${slug}/referrals`);
}
