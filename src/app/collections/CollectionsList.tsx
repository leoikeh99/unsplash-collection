import { getUserCollections } from "@/data/collection";
import { classNames } from "@/utils";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

// grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]

async function CollectionsList() {
  noStore();
  const collections = await getUserCollections();
  return (
    <div className="grid grid-cols-3 gap-8">
      {collections.map((collection) => (
        <div key={collection.id}>
          {collection.photos.length > 0 ? (
            <div
              key={collection.id}
              className={classNames(
                "h-[17rem]",
                "grid gap-0.5 rounded-md overflow-hidden relative",
                collection.photos.length === 2
                  ? "grid-cols-2"
                  : collection.photos.length > 2
                  ? "grid-cols-4 grid-rows-2"
                  : ""
              )}
            >
              {collection.photos.slice(0, 3).map((photo, index) => (
                <div
                  key={photo.id}
                  className={classNames(
                    "max-h-[17rem] h-full",
                    collection.photos.length > 2
                      ? index === 0
                        ? "col-span-3 row-span-2"
                        : "col-span-1 row-span-1"
                      : ""
                  )}
                >
                  <Image
                    src={photo.image}
                    className="w-full h-full object-cover block"
                    alt={collection.description || "collection image"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
              <Link
                href={`/collections/${collection.id}`}
                className="absolute inset-0"
              >
                <span className="sr-only">
                  View {collection.title} collection
                </span>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CollectionsList;
