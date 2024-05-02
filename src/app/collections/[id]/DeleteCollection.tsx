"use client";
import { deleteCollectionAction } from "@/actions/collections";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogDismiss,
  DialogHeading,
  useDialogStore,
} from "@ariakit/react";
import { Trash } from "lucide-react";
import { FormEvent, useState } from "react";

type Props = {
  title: string;
  id: string;
};

const DeleteCollection = ({ title, id }: Props) => {
  const dialogStore = useDialogStore();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const deleteCollection = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    setLoading(true);
    deleteCollectionAction(formData).then((res) => {
      if (res?.error) {
        toast({
          title: "Error",
          description: res.message,
        });
      }
      setLoading(false);
    });
  };
  return (
    <div>
      <button
        className="btn-ghost btn-sm text-red-500"
        onClick={() => dialogStore.show()}
      >
        <Trash size="16" /> Delete
      </button>
      <Dialog
        store={dialogStore}
        backdrop={
          <div className="bg-black opacity-0 transition-opacity data-[enter]:opacity-40 data-[leave]:opacity-0" />
        }
        className="fixed inset-[0.75rem] m-auto flex gap-5 flex-col h-fit max-h-[75dvh] z-50 max-w-md bg-white p-5 rounded-md transition-transform origin-center scale-95 data-[enter]:scale-100 data-[leave]:scale-95"
      >
        <DialogHeading className="text-xl font-semibold">
          Delete collection
        </DialogHeading>
        <p>
          Are you sure you want to delete the collection{" "}
          <strong>'{title}'</strong>? This action cannot be reversed.
        </p>

        <div className="flex gap-3 justify-end">
          <form onSubmit={deleteCollection}>
            <input readOnly type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="btn btn-base btn-danger"
              disabled={loading}
            >
              Delete
            </button>
          </form>
          <DialogDismiss className="btn btn-base">Cancel</DialogDismiss>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteCollection;
