import authOptions from "../auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { CreateCollection } from "./Schemas";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const url = new URL(req.nextUrl);
  const photoId = url.searchParams.get("photo") as string;
  const search = url.searchParams.get("search") as string;
  const filterPhotoCollections =
    url.searchParams.get("filterPhotoCollections") === "true" ? true : false;

  const filter = filterPhotoCollections
    ? {
        none: {
          unsplashId: photoId,
        },
      }
    : {
        some: {
          unsplashId: photoId,
        },
      };

  if (photoId) {
    const collections = await prisma.collection.findMany({
      where: {
        userId,
        photos: filter,
        title: {
          contains: search || "",
          mode: "insensitive",
        },
      },
      include: {
        photos: true,
      },
    });

    if (!collections) {
      return Response.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    return Response.json(collections);
  }
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      photos: true,
    },
  });

  if (!collections) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }

  return Response.json(collections);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const body: CreateCollection = await request.json();

  const collection = await prisma.collection.create({
    data: {
      ...body,
      userId,
    },
  });

  if (!collection) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }

  return Response.json({
    collection,
    message: "Collection created successfully",
  });
}
