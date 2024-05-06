import { getPhoto } from "@/data/unsplash";
import "@/styles/layoutStyles.css";
import "@/styles/uiStyles.css";
import Image from "next/image";
import AddToCollectionsButton from "./ui/AddToCollectionsButton";
import CollectionModal from "@/components/collection/CollectionModal";
import CollectionList from "./CollectionList";
import moment from "moment";
import DownloadButton from "./ui/DownloadButton";

async function ViewPhoto({ params }: { params: { id: string } }) {
  const photo = await getPhoto(params.id);

  return (
    <div>
      <CollectionModal photo={photo} />
      <h1 className="sr-only">{photo.description || "Image description"}</h1>
      <div className="max-w-[40rem] block tab:grid tab:max-w-full tab:grid-cols-2 tab:gap-9 mx-auto py-10">
        <div className="">
          <Image
            src={photo.urls.regular}
            className="w-full object-cover rounded-md"
            alt={photo.alt_description || "photo image"}
            width={photo.width}
            height={photo.height}
          />
        </div>
        <div className="mt-12 tab:mt-0">
          <div className="flex items-center gap-4 mb-5">
            <Image
              src={photo.user.profile_image.medium}
              alt="Publisher Profile Photo"
              className="rounded-full"
              width={50}
              height={50}
            />
            <p className="text-md font-semibold">{photo.user.name}</p>
          </div>
          <p className="text-sm font-light mb-5">
            Published on {moment(photo.created_at).format("MMMM DD, YYYY")}
          </p>
          <div className="grid sm:flex sm:gap-4 gap-3 mb-12 flex-wrap">
            <AddToCollectionsButton />
            <DownloadButton photo={photo} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Collections</h2>
            <CollectionList id={photo.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPhoto;
