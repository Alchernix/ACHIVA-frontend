import { NextResponse } from "next/server";
import { signOut } from "@/auth";

export async function GET(request: Request) {
  await signOut({ redirect: false });

  const { origin } = new URL(request.url);

  return NextResponse.redirect(origin);
}
