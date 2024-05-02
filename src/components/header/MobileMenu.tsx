import { Dialog, useDialogStore } from "@ariakit/react";
import { HamIcon, Menu } from "lucide-react";
import React from "react";

const MobileMenu = () => {
  const dialogStore = useDialogStore();
  return (
    <div className="sm:hidden">
      <button>
        <Menu />
      </button>
      <Dialog
        store={dialogStore}
        backdrop={
          <div className="bg-black opacity-0 transition-opacity data-[enter]:opacity-40 data-[leave]:opacity-0" />
        }
        className="fixed inset-[0.75rem] m-auto flex gap-4 flex-col h-fit max-h-[75dvh] z-50 max-w-2xl bg-white p-5 rounded-md transition-transform origin-center scale-95 data-[enter]:scale-100 data-[leave]:scale-95"
      ></Dialog>
    </div>
  );
};

export default MobileMenu;
