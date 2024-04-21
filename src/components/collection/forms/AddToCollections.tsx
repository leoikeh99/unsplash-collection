"use client";
import { useParams } from "next/navigation";

const AddToCollection = () => {
  const params = useParams();

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
          className="w-full py-3 pl-4 pr-12 text-slate-900 border rounded-md outline-none  focus:border-indigo-600 shadow"
        />
      </div>
    </div>
  );
};

export default AddToCollection;
