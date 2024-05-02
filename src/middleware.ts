import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import ValidateRoute from "./app/api/middleware/ValidateRoute";
import {
  AddPhotoSchema,
  CreateCollectionSchema,
  RemovePhotoSchema,
} from "./app/api/collections/Schemas";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (pathname === "/api/collections" && request.method === "POST") {
    return ValidateRoute(request, CreateCollectionSchema);
  }
  if (
    pathname.match(/^\/api\/collections\/([^/]+)$/) &&
    request.method === "POST"
  ) {
    return ValidateRoute(request, AddPhotoSchema);
  }
  if (pathname === "/api/collections/photo" && request.method === "DELETE") {
    return ValidateRoute(request, RemovePhotoSchema);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/collections", "/api/collections/:id*"],
};
