"use client";
import "@/styles/uiStyles.css";
import { Frown, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-sm mx-auto mt-28 grid justify-center gap-5">
      <p className="flex justify-center">
        <span className="sr-only">Sad face</span>
        <Frown size={70} />
      </p>
      <h1 className="text-2xl sm:text-3xl text-center font-semibold">
        Oops, something went wrong!
      </h1>
      <button
        className="btn btn-base justify-self-center"
        onClick={() => reset()}
      >
        <RefreshCcw /> Try again
      </button>
    </div>
  );
}
