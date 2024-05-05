import "@/styles/layoutStyles.css";
import SearchForm from "@/components/forms/SearchForm";
import SearchResults from "./SearchResults";
import { Suspense } from "react";
import Loading from "@/components/Photoslist/Loading";
export const dynamic = "force-dynamic";

async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams.search as string;

  let page = parseInt(searchParams.page as string) || 1;
  page = isNaN(page) ? 1 : page;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <SearchResults search={search} page={page} />
      </Suspense>
    </div>
  );
}

export default Search;
