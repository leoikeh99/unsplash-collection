"use client";
import DialogContext from "@/context/DialogContext";
import Image from "next/image";
import { useContext } from "react";

const AddToCollectionsButton = () => {
  const { collectionDialogStore } = useContext(DialogContext);

  return (
    <>
      {collectionDialogStore && (
        <button className="button" onClick={() => collectionDialogStore.show()}>
          <Image src="/assets/Plus.svg" alt="" width={20} height={20} />
          Add to Collection
        </button>
      )}
    </>
  );
};

export default AddToCollectionsButton;
