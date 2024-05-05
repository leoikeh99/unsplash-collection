"use client";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/lib/fetch/collectionRequests";
import { Full } from "unsplash-js/dist/methods/photos/types";
import CollectionItem from "./CollectionItem";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import Loading from "./Loading";

const AddToCollection = ({ photo }: { photo: Full }) => {
  const [search, setSearch] = useState("");
  const searchQuery = useDebounce(search, 500);

  const collectionQuery = useQuery({
    queryKey: ["collections", searchQuery],
    queryFn: () => getCollections(photo.id, searchQuery, true),
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-300 right-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search your collections"
          className="w-full py-3 sm:py-4 pl-4 pr-12 border border-border rounded-md outline-none bg-background dark:bg-muted shadow"
          onChange={onSearchChange}
        />
      </div>
      {collectionQuery.isLoading ? (
        <div className="my-4 bg-slate-300 w-28 h-3 rounded-lg animate-pulse"></div>
      ) : (
        searchQuery.trim() !== "" &&
        collectionQuery.data && (
          <p className="text-muted-foreground font-semibold mb-3 mt-4 ml-2">
            {collectionQuery.data.length} match
            {collectionQuery.data.length === 1 ? "" : "es"}
          </p>
        )
      )}
      <div className="max-h-96 min-h-96 overflow-y-auto">
        {collectionQuery.isLoading ? (
          <Loading />
        ) : collectionQuery.isError ? (
          <p className="mt-7">Something went wrong, try again.</p>
        ) : (
          <div>
            {collectionQuery.data?.map((collection) => (
              <CollectionItem
                key={collection.id}
                collection={collection}
                photo={photo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCollection;
