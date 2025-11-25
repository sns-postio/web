// app/api/youtube/redirect/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 커스텀 헤더에서 토큰 가져오기
    const accessToken = request.headers.get("x-access-token");

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
