import SearchForm from "@/components/forms/SearchForm";
export const dynamic = "force-dynamic";

function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = searchParams.search;
  return (
    <div>
      <SearchForm />
      <p>{data}</p>
    </div>
  );
}

export default Search;
