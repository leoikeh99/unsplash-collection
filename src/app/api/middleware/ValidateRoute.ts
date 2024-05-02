import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

export default async function ValidateRoute(
  request: NextRequest,
  schema: ZodSchema<any>
) {
  const body = await request.json();
  const data = schema.safeParse(body);

  if (!data.success) {
    return NextResponse.json(
      { errors: data.error.issues.map((issue) => issue) },
      { status: 400 }
    );
  }

  return NextResponse.next();
}
