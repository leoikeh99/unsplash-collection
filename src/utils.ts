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
