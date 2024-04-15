"use client";
import DialogContext from "@/context/DialogContext";
import { Dialog, DialogHeading } from "@ariakit/react";
import { useContext } from "react";

const AuthModal = () => {
  const { authDialogStore } = useContext(DialogContext);

  return (
    <>
      {authDialogStore && (
        <Dialog
          store={authDialogStore}
          backdrop={
            <div className="bg-black opacity-0 transition-opacity data-[enter]:opacity-40 data-[leave]:opacity-0" />
          }
          className="fixed inset-[0.75rem] m-auto flex gap-4 flex-col h-fit max-h-[calc(100dvh - 2 * 0.75rem)] z-50 max-w-sm bg-white p-4 rounded-md transition-transform origin-center scale-95 data-[enter]:scale-100 data-[leave]:scale-95"
        >
          <DialogHeading>Login</DialogHeading>
          <p>Sign in to continue</p>
          <button>Sign in</button>
        </Dialog>
      )}
    </>
  );
};

export default AuthModal;
