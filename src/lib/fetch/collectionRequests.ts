import type { Collection, Photo } from "@prisma/client";

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
