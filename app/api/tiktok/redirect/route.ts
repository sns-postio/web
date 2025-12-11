import { NextRequest, NextResponse } from "next/server";
import { TIKTOK_ENDPOINTS } from "@/features/tiktok/api/endpoint";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get("x-access-token");

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is required" }, { status: 401 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
    if (!baseUrl) {
      return NextResponse.json({ error: "API base URL is missing" }, { status: 500 });
    }

    const apiUrl = `${baseUrl}${TIKTOK_ENDPOINTS.AUTH_REDIRECT}`;

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

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      if (data?.url) {
        return NextResponse.json({ redirectUrl: data.url });
      }
    }

    return NextResponse.json({ error: "No redirect found" }, { status: response.status || 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch redirect" }, { status: 500 });
  }
}
