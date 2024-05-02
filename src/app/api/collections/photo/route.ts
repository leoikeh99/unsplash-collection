import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  const { collectionId, photoId } = await request.json();

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const removePhoto = await prisma.collection.update({
    where: {
      userId,
      id: collectionId,
    },
    data: {
      photos: {
        disconnect: {
          unsplashId: photoId,
        },
      },
    },
  });

  if (!removePhoto) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }

  return Response.json(removePhoto);
}
