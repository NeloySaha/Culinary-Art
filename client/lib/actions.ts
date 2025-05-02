"use server";

import { cookies } from "next/headers";
import { decrypt, deleteSession } from "./session";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout() {
  await deleteSession();
}
