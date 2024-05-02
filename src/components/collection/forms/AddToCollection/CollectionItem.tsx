"use client";
import { addPhotoToCollection } from "@/lib/fetch/collectionRequests";
import { classNames } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Full } from "unsplash-js/dist/methods/photos/types";
import type { Collection, Photo } from "@prisma/client";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";

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
      className="flex gap-4 items-center text-left p-2 disabled:cursor-not-allowed hover:bg-[#E5E7EB] rounded-lg group"
      onClick={() => addToCollectionMutation.mutate()}
      disabled={addToCollectionMutation.isPending}
    >
      <Image
        src={
          collection.photos[collection.photos.length - 1]?.image ||
          "/assets/no-image.png"
        }
        height={75}
        width={73}
        alt={collection.title}
        className={classNames(
          "w-[4.3rem] h-[4.5rem] object-cover rounded-lg",
          !collection.photos[collection.photos.length - 1]
            ? "border-2 border-gray-300"
            : ""
        )}
      />
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="font-semibold">{collection.title}</p>
          <p className="text-sm">{collection.photos.length} photos</p>
        </div>
        <div>
          <p className="btn-ghost btn-sm invisible group-hover:visible group-focus:visible">
            {!addToCollectionMutation.isPending ? (
              <>
                <Image src="/assets/Plus.svg" alt="" width={20} height={20} />
                Add to Collection
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