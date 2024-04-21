"use client";
import { DialogStore, useDialogStore } from "@ariakit/react";
import { createContext } from "react";

type ContextState = {
  authDialogStore: DialogStore | null;
  collectionDialogStore: DialogStore | null;
};

const contextDefaultValues: ContextState = {
  authDialogStore: null,
  collectionDialogStore: null,
};

const DialogContext = createContext(contextDefaultValues);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const authDialogStore = useDialogStore();
  const collectionDialogStore = useDialogStore();

  return (
    <DialogContext.Provider value={{ authDialogStore, collectionDialogStore }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContext;
