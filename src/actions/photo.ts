"use server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

export const removePhotoAction = async (formData: FormData) => {
  noStore();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const collectionId = formData.get("collectionId") as string;
  const unsplashId = formData.get("unsplashId") as string;

  if (!session || !userId) {
    return {
      success: false,
      error: true,
      message: "Unauthenticated",
    };
  }

  await prisma.collection.update({
    where: {
      userId,
      id: collectionId,
    },
    data: {
      photos: {
        disconnect: {
          unsplashId,
        },
      },
    },
  });

  revalidatePath(`/photo/${unsplashId}`);
  revalidatePath(`/collections/${collectionId}`);
  revalidatePath(`/collections`);
};
