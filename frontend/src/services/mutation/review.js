import { useMutation } from "@tanstack/react-query";
import { postReview } from "../api/review";

export const usePostReview = (onPostReviewSuccess) => {
  return useMutation({
    mutationFn: (data) => {
      return postReview(data);
    },
    onSuccess: (data) => {
      if (data) {
        onPostReviewSuccess();
      }
    },
  });
};
