import "@/styles/layoutStyles.css";
import SearchResults from "./SearchResults";
import { Suspense } from "react";
import Loading from "@/components/Photoslist/Loading";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unspalsh Collection | Search",
  description:
    "Search and discover photos on Unsplash, the internet's largest collection of photos.",
};

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
