import { createApi } from "unsplash-js";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY as string;

const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
});

export const searchPhotos = async (search: string, page = 1) => {
  try {
    const response = await unsplash.search.getPhotos({
      query: search,
      page: page,
      perPage: 28, //maximum is 30
    });
    if (!response.response) throw new Error("Something went wrong");
    return {
      results: response.response.results,
      totalPages: response.response.total_pages,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
