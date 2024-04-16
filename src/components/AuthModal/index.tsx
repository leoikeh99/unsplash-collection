"use client";
import DialogContext from "@/context/DialogContext";
import { Dialog, DialogHeading } from "@ariakit/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
          className="fixed inset-[0.75rem] m-auto flex gap-4 flex-col items-center h-fit max-h-[calc(100dvh - 2 * 0.75rem)] z-50 max-w-sm bg-white p-6 rounded-md transition-transform origin-center scale-95 data-[enter]:scale-100 data-[leave]:scale-95"
        >
          <DialogHeading>
            <Image
              src="/assets/Logo.svg"
              alt="logo"
              width={118}
              height={24}
              priority
            />
          </DialogHeading>
          <p className="text-center py-2">
            Discover inspiration. Access a world of free, stunning images now!
          </p>
          <button
            onClick={() => signIn("github")}
            className="w-full p-3 text-white bg-slate-900 rounded-3xl flex justify-center gap-2"
          >
            <Image
              src="/assets/github.svg"
              alt="github"
              width={20}
              height={20}
            />
            Continue with Github
          </button>
        </Dialog>
      )}
    </>
  );
};

export default AuthModal;
