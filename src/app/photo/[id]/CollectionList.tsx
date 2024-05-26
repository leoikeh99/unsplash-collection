import { getPhotoCollections } from "@/data/collection";
import CollectionItem from "./CollectionItem";

async function CollectionList({ id }: { id: string }) {
  const collections = await getPhotoCollections(id);

  return (
    <div>
      {collections.length > 0 ? (
        collections.map((collection) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            unsplashId={id}
          />
        ))
      ) : (
        <p>This photo has no collections</p>
      )}
    </div>
  );
}

export default CollectionList;
