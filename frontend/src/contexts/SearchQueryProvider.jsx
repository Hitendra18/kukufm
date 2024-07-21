import { useState } from "react";
import { searchQueryContext } from "./useSearchQueryState";

const SearchQueryProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  return (
    <searchQueryContext.Provider
      value={{
        search,
        setSearch,
        fetchData,
        setFetchData,
        categories,
        setCategories,
        languages,
        setLanguages,
        orderBy,
        setOrderBy,
        page,
        setPage,
        limit,
        setLimit,
      }}
    >
      {children}
    </searchQueryContext.Provider>
  );
};
export default SearchQueryProvider;
