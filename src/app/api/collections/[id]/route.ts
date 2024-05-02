import prisma from "@/lib/prisma";
import { AddPhoto } from "../Schemas";
import { revalidatePath } from "next/cache";

export async function POST(
  request: Request,
  route: { params: { id: string } }
) {
  const collectionId = route.params.id;
  const data: AddPhoto = await request.json();

  const collection = await prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      photos: {
        connectOrCreate: {
          where: {
            unsplashId: data.unsplashId,
          },
          create: {
            ...data,
            description: data.description || "",
          },
        },
      },
    },
  });

  if (!collection) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }

  return Response.json(collection);
}
