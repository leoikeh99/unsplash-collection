import type { Collection, Photo } from "@prisma/client";
import { Full } from "unsplash-js/dist/methods/photos/types";

export async function getCollections(
  photo?: string,
  search?: string,
  filterPhotoCollections?: boolean
): Promise<Array<Collection & { photos: Array<Photo> }>> {
  if (typeof search === "string" && search.trim() === "") {
    return [];
  }

  const params: any = {};

  if (typeof photo === "string") params["photo"] = photo;
  if (typeof search === "string") params["search"] = search;
  if (filterPhotoCollections)
    params["filterPhotoCollections"] = filterPhotoCollections;

  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(`/api/collections?${queryString}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
}

export async function addPhotoToCollection(
  photo: Full,
  collectionId: string
): Promise<Collection & { photos: Array<Photo> }> {
  const response = await fetch(`/api/collections/${collectionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      unsplashId: photo.id,
      description: photo.description || "",
      image: photo.urls.regular,
    }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}

export async function removePhotoFromCollection(
  collectionId: string,
  photoId: string
): Promise<Collection & { photos: Array<Photo> }> {
  const response = await fetch(`/api/collections/photo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionId,
      photoId,
    }),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}

export async function getPhotoCollections(
  photoId: string
): Promise<Array<Collection & { photos: Array<Photo> }>> {
  const response = await fetch(`/api/collections?photo=${photoId}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
}
