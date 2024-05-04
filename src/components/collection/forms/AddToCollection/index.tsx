"use client";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/lib/fetch/collectionRequests";
import { Full } from "unsplash-js/dist/methods/photos/types";
import CollectionItem from "./CollectionItem";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

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
          className="w-full py-3 sm:py-4 pl-4 pr-12 text-slate-900 border rounded-md outline-none  focus:border-indigo-600 shadow"
          onChange={onSearchChange}
        />
      </div>
      {searchQuery.trim() !== "" && collectionQuery.data && (
        <p className="text-[#6C727F] font-semibold mb-3 mt-4 ml-2">
          {collectionQuery.data.length} match
          {collectionQuery.data.length === 1 ? "" : "es"}
        </p>
      )}
      <div className="min-h-96 scroll-auto">
        {collectionQuery.isLoading ? (
          <p>Loading...</p>
        ) : collectionQuery.isError ? (
          <p>Error</p>
        ) : (
          <div className="">
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
