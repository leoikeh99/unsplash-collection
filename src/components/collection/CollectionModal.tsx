"use client";
import DialogContext from "@/context/DialogContext";
import { Dialog, DialogHeading } from "@ariakit/react";
import { useContext, useState } from "react";
import AddToCollections from "./forms/AddToCollections";
import CreateCollection from "./forms/CreateCollection";

const CollectionModal = () => {
  const { collectionDialogStore } = useContext(DialogContext);
  const [createCollection, setCreateCollection] = useState(false);
  const dialogState = collectionDialogStore?.useState();

  return (
    <div>
      {collectionDialogStore && (
        <Dialog
          store={collectionDialogStore}
          backdrop={
            <div className="bg-black opacity-0 transition-opacity data-[enter]:opacity-40 data-[leave]:opacity-0" />
          }
          className="fixed inset-[0.75rem] m-auto flex gap-4 flex-col max-h-[75dvh] z-50 max-w-lg bg-white p-5 rounded-md transition-transform origin-center scale-95 data-[enter]:scale-100 data-[leave]:scale-95"
        >
          <DialogHeading className="text-xl font-bold">
            {!createCollection ? "Add to Collections" : "Create Collection"}
          </DialogHeading>
          {dialogState?.mounted && (
            <div className="pt-1">
              {!createCollection ? <AddToCollections /> : <CreateCollection />}
            </div>
          )}
        </Dialog>
      )}
    </div>
  );
};

export default CollectionModal;
