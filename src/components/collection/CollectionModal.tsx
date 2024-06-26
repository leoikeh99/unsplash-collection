"use client";
import DialogContext from "@/context/DialogContext";
import { Dialog, DialogHeading } from "@ariakit/react";
import { useContext, useEffect, useState } from "react";
import AddToCollections from "./forms/AddToCollection";
import CreateCollection from "./forms/CreateCollection";
import { Full } from "unsplash-js/dist/methods/photos/types";
import { ArrowLeft, Plus } from "lucide-react";

const CollectionModal = ({ photo }: { photo: Full }) => {
  const { collectionDialogStore } = useContext(DialogContext);
  const [createCollection, setCreateCollection] = useState(false);
  const dialogState = collectionDialogStore?.useState();

  const toggleCreateCollection = () => {
    setCreateCollection(!createCollection);
  };

  useEffect(() => {
    if (!dialogState?.mounted) {
      setCreateCollection(false);
    }
  }, [dialogState, setCreateCollection]);

  return (
    <div>
      {collectionDialogStore && (
        <Dialog
          store={collectionDialogStore}
          backdrop={
            <div className="bg-black opacity-0 transition-opacity data-[enter]:opacity-40 data-[leave]:opacity-0" />
          }
          className="fixed inset-[0.75rem] m-auto flex gap-4 flex-col h-fit max-h-[75dvh] z-50 max-w-2xl bg-background p-5 rounded-md transition-transform origin-center scale-95 data-[enter]:scale-100 data-[leave]:scale-95"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              {createCollection && (
                <button
                  className="cursor-pointer"
                  onClick={() => setCreateCollection(false)}
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <DialogHeading className="text-lg sm:text-xl font-bold">
                {!createCollection ? "Add to Collections" : "New Collection"}
              </DialogHeading>
            </div>
            {!createCollection && (
              <button
                className="btn btn-xs"
                onClick={() => setCreateCollection(true)}
              >
                <Plus size={16} />
                New <span className="hidden sm:inline">Collection</span>
              </button>
            )}
          </div>
          {dialogState?.mounted && (
            <div className="pt-1">
              {!createCollection ? (
                <AddToCollections photo={photo} />
              ) : (
                <CreateCollection
                  toggleCreateCollection={toggleCreateCollection}
                />
              )}
            </div>
          )}
        </Dialog>
      )}
    </div>
  );
};

export default CollectionModal;
