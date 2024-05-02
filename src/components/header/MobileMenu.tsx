import "@/styles/uiStyles.css";
import { Dialog, useDialogStore } from "@ariakit/react";
import { LogIn, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import NavLinks from "./NavLinks";
import { signOut, useSession } from "next-auth/react";
import DialogContext from "@/context/DialogContext";

const MobileMenu = () => {
  const dialogStore = useDialogStore();
  const { data, status } = useSession();
  const { authDialogStore } = useContext(DialogContext);

  return (
    <div className="sm:hidden">
      <button onClick={() => dialogStore.show()}>
        <span className="sr-only">Open menu</span>
        <Menu />
      </button>
      <Dialog
        store={dialogStore}
        backdrop={
          <div className="sm:hidden bg-black opacity-0 transition-opacity data-[enter]:opacity-40 data-[leave]:opacity-0" />
        }
        className="sm:hidden fixed top-0 right-0 w-80 h-dvh flex flex-col justify-between bg-white transition-transform translate-x-full data-[enter]:translate-x-0 data-[leave]:translate-x-full py-5 px-4"
      >
        <Image
          src="/assets/Logo.svg"
          alt="logo"
          width={118}
          height={24}
          priority
        />
        <div className="py-5">
          <NavLinks />
        </div>
        <div>
          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <Image
                src={data?.user?.image || `/assets/user.svg`}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p>{data?.user?.name}</p>
                <button
                  className="flex items-center gap-2 text-red-500"
                  onClick={() => signOut()}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                dialogStore.hide();
                authDialogStore?.show();
              }}
              className="btn-ghost btn-base text-[#6F727F] font-semibold"
            >
              <LogIn />
              Sign in
            </button>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default MobileMenu;
