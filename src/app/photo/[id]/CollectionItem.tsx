"use client";
import { classNames } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Collection, Photo } from "@prisma/client";
import Image from "next/image";
import { Minus } from "lucide-react";
import { removeFromCollection } from "@/actions/collections";

const CollectionItem = ({
  collection,
  unsplashId,
}: {
  collection: Collection & { photos: Array<Photo> };
  unsplashId: string;
}) => {
  const queryClient = useQueryClient();

  const action = removeFromCollection.bind(null, collection.id, unsplashId);

  const removePhotoMutation = useMutation({
    mutationFn: action,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photoCollections"] });
    },
  });

  return (
    <button
      className="flex w-full gap-3 sm:gap-4 items-center text-left p-2 hover:bg-muted rounded-lg group disabled:cursor-not-allowed [&:not(:last-child)]:mb-3 group"
      onClick={() => removePhotoMutation.mutate()}
      disabled={removePhotoMutation.isPending}
    >
      <Image
        unoptimized
        src={
          collection.photos[collection.photos.length - 1]?.image ||
          "/assets/no-image.png"
        }
        height={75}
        width={73}
        alt={collection.title}
        className={classNames(
          "w-[3.3rem] h-[3.5rem] sm:w-[4.3rem] sm:h-[4.5rem] object-cover rounded-lg",
          !collection.photos[collection.photos.length - 1]
            ? "border-2 border-gray-300"
            : ""
        )}
      />
      <div className="flex flex-1 min-w-0 items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
            {collection.title}
          </p>
          <p className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
            {collection.photos.length} photos
          </p>
        </div>
        <div>
          {
            <p className="btn-ghost btn-sm sm:invisible group-hover:visible group-focus:visible">
              {!removePhotoMutation.isPending ? (
                <>
                  <Minus size={16} />
                  Remove
                </>
              ) : (
                "Removing..."
              )}
            </p>
          }
        </div>
      </div>
    </button>
  );
};

export default CollectionItem;
