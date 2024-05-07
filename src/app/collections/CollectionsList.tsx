import { getUserCollections } from "@/data/collection";
import { classNames } from "@/utils";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

async function CollectionsList() {
  noStore();
  const collections = await getUserCollections();
  return (
    <div>
      {collections.length > 0 ? (
        <div className="grid sm:grid-cols-2 tab:grid-cols-3 gap-8 max-w-[24rem] sm:max-w-[45rem] tab:max-w-full mx-auto">
          {collections.map((collection) => (
            <div key={collection.id}>
              {collection.photos.length > 0 ? (
                <div className="relative">
                  <div
                    key={collection.id}
                    className={classNames(
                      "h-[13rem] xs:h-[17rem]",
                      "grid gap-0.5 rounded-md overflow-hidden",
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
                          "max-h-[13rem] xs:max-h-[17rem] h-full",
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
                  <div className="w-full mt-3">
                    <p className="font-semibold">{collection.title}</p>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {collection.photos.length} photo
                      {collection.photos.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="h-[13rem] xs:h-[17rem] rounded-md overflow-hidden relative">
                    <Image
                      src="/assets/no-image.png"
                      className="w-full h-full object-cover block border-2 border-gray-300 rounded-md"
                      alt={collection.description || "No image"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <Link
                      href={`/collections/${collection.id}`}
                      className="absolute inset-0"
                    >
                      <span className="sr-only">
                        View {collection.title} collection
                      </span>
                    </Link>
                  </div>
                  <div className="w-full mt-3">
                    <p className="font-semibold">{collection.title}</p>
                    <p className="text-sm font-semibold text-gray-400">
                      {collection.photos.length} photos
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">No collections created yet</p>
      )}
    </div>
  );
}

export default CollectionsList;
