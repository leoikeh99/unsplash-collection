"use client";
import DialogContext from "@/context/DialogContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";

const AddToCollectionsButton = () => {
  const { collectionDialogStore } = useContext(DialogContext);
  const { status } = useSession();

  return (
    <>
      {collectionDialogStore && (
        <button
          className="btn btn-base"
          onClick={() => collectionDialogStore.show()}
          disabled={status !== "authenticated"}
        >
          <Image src="/assets/Plus.svg" alt="" width={20} height={20} />
          Add to Collection
        </button>
      )}
    </>
  );
};

export default AddToCollectionsButton;
