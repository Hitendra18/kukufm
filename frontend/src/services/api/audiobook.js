import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const fetchAllAudiobooks = async ({
  categories = [],
  languages = [],
  search = "",
  orderBy = "",
  category_rank = "",
  limit = "",
  page = "",
}) => {
  try {
    const categoriesString = categories.join(",");
    const languagesString = languages.join(",");
    console.log(
      "query for",
      `/api/audiobook?categories=${categoriesString}&languages=${languagesString}&search=${search}&orderBy=${orderBy}&category_rank=${category_rank}&limit=${limit}&page=${page}`
    );
    const { data } = await axiosInstance.get(
      `/api/audiobook?categories=${categoriesString}&languages=${languagesString}&search=${search}&orderBy=${orderBy}&category_rank=${category_rank}&limit=${limit}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleAudiobook = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/api/audiobook/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
