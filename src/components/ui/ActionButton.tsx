"use client";

import { classNames } from "@/utils";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  classes?: string;
  children?: React.ReactNode;
  type: "submit" | "reset" | "button";
};

const ActionButton = ({ classes, type, children }: Props) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log(pending);
  }, [pending]);

  return (
    <button
      type={type}
      className={classNames(classes || "", "disabled:opacity-50")}
      disabled={pending}
    >
      {children}
    </button>
  );
};

export default ActionButton;
