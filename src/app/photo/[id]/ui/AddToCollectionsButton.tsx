"use client";
import DialogContext from "@/context/DialogContext";
import { Plus } from "lucide-react";
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
          <Plus size={16} />
          Add to Collection
        </button>
      )}
    </>
  );
};

export default AddToCollectionsButton;
