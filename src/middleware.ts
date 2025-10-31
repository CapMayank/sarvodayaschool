/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	// Add CORS headers
	response.headers.set("Access-Control-Allow-Origin", "*");
	response.headers.set(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS, PATCH"
	);
	response.headers.set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	response.headers.set("Access-Control-Max-Age", "86400");

	// Handle preflight requests
	if (request.method === "OPTIONS") {
		return new NextResponse(null, { headers: response.headers, status: 200 });
	}

	return response;
}

export const config = {
	matcher: "/api/:path*", // Apply to all API routes
};
