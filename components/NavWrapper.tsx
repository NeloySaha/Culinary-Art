import { getSession } from "@/lib/actions";
import React from "react";
import Navbar from "./Navbar";
import { JWTPayload } from "jose";

export default async function NavWrapper() {
  const session = await getSession();

  return <Navbar userInfo={session as JWTPayload} />;
}
