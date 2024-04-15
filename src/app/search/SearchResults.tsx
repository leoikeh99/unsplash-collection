import PhotosList from "@/components/photos/PhotosList";
import { searchPhotos } from "@/data/unsplash";
import { groupPhotoColumns } from "@/utils";

type Props = {
  search: string;
};

async function SearchResults({ search }: Props) {
  let data = await searchPhotos(search);
  const photoColumns = groupPhotoColumns(data.results);

  return <PhotosList photoColumns={photoColumns} />;
}

export default SearchResults;
