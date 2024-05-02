import "@/styles/layoutStyles.css";
import "@/styles/uiStyles.css";
import { getUserCollection } from "@/data/collection";
import { groupArray } from "@/utils";
import PhotosList from "@/components/Photoslist";
import { unstable_noStore as noStore } from "next/cache";
import EditCollection from "./EditCollection";
import DeleteCollection from "./DeleteCollection";

type Props = {
  params: {
    id: string;
  };
};

async function CollectionPage({ params }: Props) {
  noStore();
  const { id } = params;
  const collection = await getUserCollection(id);
  const photos = collection.photos;
  const photoColumns = groupArray(photos);

  return (
    <div className="container pt-12">
      <div className="max-w-[25rem] mx-auto">
        <h1 className="text-4xl text-center text-transparent bg-clip-text font-semibold mb-3 bg-gradient-to-r from-yellow-300 via-red-300 to-violet-900 bg-cover">
          {collection.title}
        </h1>
        <p className="text-center">
          {collection.photoIds.length} photo
          {collection.photoIds.length > 1 ? "s" : ""}
        </p>
        <div className="flex justify-center gap-3">
          <EditCollection
            title={collection.title}
            description={collection.description}
            id={collection.id}
          />
          <DeleteCollection title={collection.title} id={collection.id} />
        </div>
      </div>
      <div className="mt-10">
        <PhotosList photoColumns={photoColumns} />
      </div>
    </div>
  );
}

export default CollectionPage;
