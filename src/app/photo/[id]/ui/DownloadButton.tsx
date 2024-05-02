"use client";
import Image from "next/image";
import { Full } from "unsplash-js/dist/methods/photos/types";

type Props = {
  photo: Full;
};

const DownloadButton = ({ photo }: Props) => {
  async function toDataURL(url: string) {
    const blob = await fetch(url).then((res) => res.blob());
    return URL.createObjectURL(blob);
  }
  async function handleDownload() {
    const a = document.createElement("a");
    a.href = await toDataURL(photo.urls.raw);
    a.download = `${photo.description}.jpg` || `${photo.id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <button className="btn btn-base" onClick={() => handleDownload()}>
      <Image src="/assets/down arrow.svg" alt="" width={22} height={22} />
      Download
    </button>
  );
};

export default DownloadButton;
