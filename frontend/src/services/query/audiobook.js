import { useQuery } from "@tanstack/react-query";
import { fetchAllAudiobooks, fetchSingleAudiobook } from "../api/audiobook";

export const useGetAllAudiobooks = (data = {}) => {
  return useQuery({
    queryKey: ["fetchAllAudiobooks"],
    queryFn: () => fetchAllAudiobooks(data),
    enabled: false,
  });
};

export const useGetSingleAudiobook = (id) => {
  return useQuery({
    queryKey: ["fetchSingleAudiobook", id],
    queryFn: () => fetchSingleAudiobook(id),
    // enabled: false,
  });
};
