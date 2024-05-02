import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { getUserPhotos } from "./unsplash";

export const getPhotoCollections = async (unsplashId: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const collections = await prisma.collection.findMany({
    where: {
      userId,
      photos: {
        some: {
          unsplashId,
        },
      },
    },
    include: {
      photos: true,
    },
  });

  return collections;
};

export const getUserCollections = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      photos: true,
    },
  });

  return collections;
};

export const getUserCollection = async (collectionId: string, page = 1) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as string;

  const perPage = 28;
  const skip = perPage * (page - 1);

  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId,
    },
    include: {
      photos: {
        skip,
        take: perPage,
      },
    },
  });
  if (!collection) throw new Error("Something went wrong");

  const photosInfo = await getUserPhotos(
    collection.photos.map((photo) => photo.unsplashId)
  );

  return { ...collection, photos: photosInfo };
};
