import "@/styles/layoutStyles.css";
import { Suspense } from "react";
import CollectionsList from "./CollectionsList";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

async function Collections() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="container pt-12">
      <div className="max-w-[25rem] mx-auto">
        <h1 className="text-4xl text-center text-transparent bg-clip-text font-semibold mb-3 bg-gradient-to-r from-yellow-300 via-red-300 to-violet-900 bg-cover">
          Collections
        </h1>
        <p className="text-center">
          Explore the world through collections of beautiful photos free to use
          under the{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            className="border-b border-black"
          >
            <strong>Unsplash License.</strong>
          </a>
        </p>
      </div>
      <div className="mt-20 mb-10">
        <Suspense fallback={<p>Getting collections...</p>}>
          <CollectionsList />
        </Suspense>
      </div>
    </div>
  );
}

export default Collections;
