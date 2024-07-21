import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const postReview = async ({
  audiobook_id,
  full_name,
  review_text,
  rating,
}) => {
  try {
    const { data } = await axiosInstance.post("/api/review", {
      audiobook_id,
      full_name,
      review_text,
      rating,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
