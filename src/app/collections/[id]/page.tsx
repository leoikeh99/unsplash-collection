import "@/styles/layoutStyles.css";
import "@/styles/uiStyles.css";
import { getUserCollection } from "@/data/collection";
import PhotosList from "@/components/Photoslist";
import { unstable_noStore as noStore } from "next/cache";
import EditCollection from "./EditCollection";
import DeleteCollection from "./DeleteCollection";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function CollectionPage({ params }: Props) {
  noStore();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const { id } = params;
  const collection = await getUserCollection(id);
  const photos = collection.photos as Basic[];

  return (
    <div>
      <div className="max-w-[25rem] mx-auto">
        <h1 className="text-3xl sm:text-4xl text-center text-transparent bg-clip-text font-semibold mb-3 bg-gradient-to-r from-[#F2C593] to-[#8A3282] bg-cover">
          {collection.title}
        </h1>
        <p className="text-center">
          {collection.photos.length} photo
          {collection.photos.length !== 1 ? "s" : ""}
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
        <PhotosList photos={photos} />
      </div>
    </div>
  );
}

export default CollectionPage;
