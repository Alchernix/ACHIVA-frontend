import { NextResponse } from "next/server";

export async function GET() {
  const logoutUrl = new URL(`${process.env.AUTH_COGNITO_ISSUER}/logout`);
  logoutUrl.searchParams.set("client_id", process.env.AUTH_COGNITO_ID!);
  logoutUrl.searchParams.set("logout_uri", process.env.NEXTAUTH_URL!);
  return NextResponse.redirect(logoutUrl.toString());
}
