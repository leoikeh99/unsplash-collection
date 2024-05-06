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
import { Minus } from "lucide-react";
import Loading from "@/components/collection/forms/AddToCollection/Loading";

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
      className="flex w-full gap-3 sm:gap-4 items-center text-left p-2 hover:bg-muted rounded-lg group disabled:cursor-not-allowed [&:not(:last-child)]:mb-3 group"
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
            <Loading />
          ) : photoCollectionQuery.data &&
            photoCollectionQuery.data.length > 0 ? (
            <div className="">
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
