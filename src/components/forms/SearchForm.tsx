"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search");
    if (search) {
      router.push(`/search?search=${search}`);
    }
  };

  useEffect(() => {
    const input = document.getElementById("search") as HTMLInputElement;
    input.value = search || "";
  }, [search]);

  return (
    <form action="" onSubmit={handleSubmit}>
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
          placeholder="Enter your keywords..."
          className="w-full py-4 pl-4 pr-12 text-slate-900 border rounded-md outline-none  focus:border-indigo-600 shadow"
        />
      </div>
    </form>
  );
};

export default SearchForm;
