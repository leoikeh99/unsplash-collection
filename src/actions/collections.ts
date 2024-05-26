"use server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { AddPhoto } from "@/app/api/collections/Schemas";

export const editCollectionAction = async (formData: FormData) => {
  noStore();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session || !userId) {
    return {
      success: false,
      error: true,
      message: "Unauthenticated",
    };
  }

  try {
    const updatedCollection = await prisma.collection.update({
      where: {
        userId,
        id,
      },
      data: {
        title,
        description,
      },
    });

    if (!updatedCollection) {
      return {
        success: false,
        error: true,
        message: "Something went wrong, try again.",
      };
    }

    revalidatePath(`/collections/${id}`);
    revalidatePath("/collections");

    return {
      success: true,
      error: false,
      message: "Collection updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: "Something went wrong, try again.",
    };
  }
};

export const deleteCollectionAction = async (formData: FormData) => {
  noStore();
  const id = formData.get("id") as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session || !userId) {
    return {
      success: false,
      error: true,
      message: "Unauthenticated",
    };
  }

  try {
    await prisma.collection.delete({
      where: {
        userId,
        id,
      },
    });
  } catch (error) {
    return {
      success: false,
      error: true,
      message: "Something went wrong, try again.",
    };
  }

  revalidatePath("/collections");
  redirect("/collections");
};

export const addToCollection = async (data: AddPhoto, collectionId: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session) {
    return {
      success: false,
    };
  }

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
  revalidatePath("/photo/[id]", "page");
  revalidateTag("user-collections");
  return {
    success: true,
  };
};

export const removeFromCollection = async (
  collectionId: string,
  photoId: string
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session) {
    return {
      success: false,
    };
  }

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

  revalidatePath("/photo/[id]", "page");
  revalidateTag("user-collections");
  return {
    success: true,
  };
};
