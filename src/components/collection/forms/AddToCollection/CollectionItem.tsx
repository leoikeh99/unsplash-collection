"use client";
import { addPhotoToCollection } from "@/lib/fetch/collectionRequests";
import { classNames } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Full } from "unsplash-js/dist/methods/photos/types";
import type { Collection, Photo } from "@prisma/client";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";
import { Plus } from "lucide-react";

type Props = {
  collection: Collection & { photos: Array<Photo> };
  photo: Full;
};

const CollectionItem = ({ collection, photo }: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addToCollectionMutation = useMutation({
    mutationFn: () => addPhotoToCollection(photo, collection.id),
    onSuccess: () => {
      toast({ title: "Photo added to collection" });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["photoCollections"] });
    },
  });

  return (
    <button
      className="flex w-full gap-4 items-center text-left p-2 disabled:cursor-not-allowed hover:bg-muted rounded-lg group"
      onClick={() => addToCollectionMutation.mutate()}
      disabled={addToCollectionMutation.isPending}
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
          <p className="btn-ghost btn-sm sm:invisible group-hover:visible group-focus:visible">
            {!addToCollectionMutation.isPending ? (
              <>
                <Plus size={16} />
                <span>
                  Add <span className="hidden sm:inline">to Collection</span>
                </span>
              </>
            ) : (
              "Adding..."
            )}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CollectionItem;
