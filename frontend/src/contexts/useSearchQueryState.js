import { createContext, useContext } from "react";

export const searchQueryContext = createContext(null);

export const useSearchQueryState = () => {
  return useContext(searchQueryContext);
};
