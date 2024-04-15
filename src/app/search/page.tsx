import "@/styles/layoutStyles.css";
import SearchForm from "@/components/forms/SearchForm";
import SearchResults from "./SearchResults";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams.search as string;

  return (
    <div>
      <div className="h-20 bg-[url('/assets/gradiend-bg.svg')] bg-no-repeat bg-cover"></div>
      <div className="max-w-[555px] mx-auto -mt-6 mb-10">
        <SearchForm />
      </div>
      <div className="container">
        <div>
          <Suspense fallback={<p>Getting photos...</p>}>
            <SearchResults search={search} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Search;
