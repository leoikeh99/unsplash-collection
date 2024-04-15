"use client";
import Image from "next/image";
import Link from "next/link";
import { Basic } from "unsplash-js/dist/methods/photos/types";

type Props = {
  photoColumns: Basic[][];
};

const PhotosList = ({ photoColumns }: Props) => {
  return (
    <div className="grid gap-5 grid-cols-4">
      {photoColumns.map((arr, index) => (
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
  );
};

export default PhotosList;
