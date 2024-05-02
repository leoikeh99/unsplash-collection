"use server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editCollectionAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

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
  const id = formData.get("id") as string;

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

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
