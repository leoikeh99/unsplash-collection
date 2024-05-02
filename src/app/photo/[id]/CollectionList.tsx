"use client";
import {
  getPhotoCollections,
  removePhotoFromCollection,
} from "@/lib/fetch/collectionRequests";
import { classNames } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Collection, Photo } from "@prisma/client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import DialogContext from "@/context/DialogContext";

const CollectionItem = ({
  collection,
  unsplashId,
}: {
  collection: Collection & { photos: Array<Photo> };
  unsplashId: string;
}) => {
  const queryClient = useQueryClient();
  const removePhotoMutation = useMutation({
    mutationFn: () => removePhotoFromCollection(collection.id, unsplashId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photoCollections"] });
    },
  });

  return (
    <button
      className="flex gap-4 items-center text-left p-2 hover:bg-[#E5E7EB] rounded-lg group w-full disabled:cursor-not-allowed"
      onClick={() => removePhotoMutation.mutate()}
      disabled={removePhotoMutation.isPending}
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
          {
            <p className="btn-ghost btn-sm invisible group-hover:visible">
              {!removePhotoMutation.isPending ? (
                <>
                  <Image
                    src="/assets/Remove.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
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

function CollectionList({ id }: { id: string }) {
  const { status } = useSession();
  const { authDialogStore } = useContext(DialogContext);

  const photoCollectionQuery = useQuery({
    queryKey: ["photoCollections"],
    queryFn: () => getPhotoCollections(id),
  });

  return (
    <div>
      {status !== "authenticated" ? (
        <div>
          <p>Sign in to view collections</p>
          <button
            onClick={() => authDialogStore?.show()}
            className="btn btn-sm mt-1"
          >
            Sign in
          </button>
        </div>
      ) : (
        <>
          {photoCollectionQuery.isLoading ? (
            <p>Loading...</p>
          ) : photoCollectionQuery.data &&
            photoCollectionQuery.data.length > 0 ? (
            <div className="grid gap-3">
              {photoCollectionQuery.data.map((collection) => (
                <CollectionItem
                  key={collection.id}
                  collection={collection}
                  unsplashId={id}
                />
              ))}
            </div>
          ) : (
            <p>No Collections</p>
          )}
        </>
      )}
    </div>
  );
}

export default CollectionList;