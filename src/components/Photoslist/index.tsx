"use client";
import { groupArray } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Basic } from "unsplash-js/dist/methods/photos/types";

type Props = {
  photos: Basic[];
};

const PhotosList = ({ photos }: Props) => {
  const photos4Columns = groupArray(photos, 4) as Basic[][];
  const photos3Columns = groupArray(photos, 3) as Basic[][];
  const photos2Columns = groupArray(photos, 2) as Basic[][];

  return (
    <div>
      <div className="hidden tab:grid gap-5 grid-cols-4 justify-items-center">
        {photos4Columns.map((arr, index) => (
          <div key={index}>
            {arr.map((photo) => (
              <div key={photo.id} className="mb-5 relative">
                <Image
                  className="rounded-md"
                  src={photo.urls.small}
                  alt={photo.alt_description || "photo image"}
                  width={photo.width}
                  height={photo.height}
                />
                <Link href={`/photo/${photo.id}`} className="absolute inset-0">
                  <span className="sr-only">View image</span>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className=" hidden tab:hidden sm:grid gap-5 grid-cols-3 justify-items-center">
        {photos3Columns.map((arr, index) => (
          <div key={index}>
            {arr.map((photo) => (
              <div key={photo.id} className="mb-5 relative">
                <Image
                  className="rounded-md"
                  src={photo.urls.small}
                  alt={photo.alt_description || "photo image"}
                  width={photo.width}
                  height={photo.height}
                />
                <Link href={`/photo/${photo.id}`} className="absolute inset-0">
                  <span className="sr-only">View image</span>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sm:hidden grid gap-5 grid-cols-2 justify-items-center">
        {photos2Columns.map((arr, index) => (
          <div key={index}>
            {arr.map((photo) => (
              <div key={photo.id} className="mb-5 relative">
                <Image
                  className="rounded-md"
                  src={photo.urls.small}
                  alt={photo.alt_description || "photo image"}
                  width={photo.width}
                  height={photo.height}
                />
                <Link href={`/photo/${photo.id}`} className="absolute inset-0">
                  <span className="sr-only">View image</span>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosList;
