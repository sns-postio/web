// app/api/youtube/redirect/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 401 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE + "/youtube/auth";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      redirect: "manual",
    });

    // 3xx 응답인 경우
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");

      if (location) {
        return NextResponse.json({ redirectUrl: location });
      }
    }

    return NextResponse.json({ error: "No redirect found" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch redirect" }, { status: 500 });
  }
}
