import PhotosList from "@/components/Photoslist";
import { searchPhotos } from "@/data/unsplash";
import { groupArray } from "@/utils";
import SearchPagination from "./SearchPagination";

type Props = {
  search: string;
  page: number;
};

async function SearchResults({ search, page }: Props) {
  const data = await searchPhotos(search, page);
  const photoColumns = groupArray(data.results);

  return (
    <div>
      <PhotosList photoColumns={photoColumns} />
      <SearchPagination
        search={search}
        page={page}
        totalPages={data.totalPages}
      />
    </div>
  );
}

export default SearchResults;
