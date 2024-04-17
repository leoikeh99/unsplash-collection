import PhotosList from "@/components/photos/PhotosList";
import { searchPhotos } from "@/data/unsplash";
import { groupPhotoColumns } from "@/utils";
import SearchPagination from "./SearchPagination";

type Props = {
  search: string;
  page: number;
};

async function SearchResults({ search, page }: Props) {
  const data = await searchPhotos(search, page);
  const photoColumns = groupPhotoColumns(data.results);

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
