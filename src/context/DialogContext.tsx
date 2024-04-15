"use client";
import { DialogStore, useDialogStore } from "@ariakit/react";
import { createContext } from "react";

type ContextState = {
  authDialogStore: DialogStore | null;
};

const contextDefaultValues: ContextState = {
  authDialogStore: null,
};

const DialogContext = createContext(contextDefaultValues);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const authDialogStore = useDialogStore();

  return (
    <DialogContext.Provider value={{ authDialogStore }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContext;
