import { Basic } from "unsplash-js/dist/methods/photos/types";

export function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export function groupPhotoColumns(photos: Basic[]) {
  let mainArr = photos;
  let groupedArr: Basic[][] = [[], [], [], []];

  const numOfColumns = 4;
  const numOfLoops = Math.ceil(mainArr.length / numOfColumns);

  for (let i = 0; i < numOfLoops; i++) {
    for (let x = 0; x < numOfColumns; x++) {
      if (mainArr[x]) groupedArr[x].push(mainArr[x]);
    }
    mainArr = mainArr.slice(numOfColumns);
  }

  return groupedArr;
}

const range = (lo: number, hi: number) =>
  Array.from({ length: hi - lo }, (_, i) => i + lo);
export const pagination =
  (count: number, ellipsis = "...") =>
  (page: number, total: number) => {
    const start = Math.max(
      1,
      Math.min(page - Math.floor((count - 3) / 2), total - count + 2)
    );
    const end = Math.min(
      total,
      Math.max(page + Math.floor((count - 2) / 2), count - 1)
    );
    return [
      ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
      ...range(start, end + 1),
      ...(end < total - 1 ? [ellipsis, total] : end < total ? [total] : []),
    ];
  };
