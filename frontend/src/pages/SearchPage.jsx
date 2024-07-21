import { useEffect, useState } from "react";
import { useSearchQueryState } from "../contexts/useSearchQueryState";
import AudiobookCard from "../components/AudiobookCard";
import Layout from "../components/Layout";
import { useGetAllAudiobooks } from "../services/query/audiobook";
import FilterAndSort from "../components/FilterAndSort";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const animatedComponents = makeAnimated();

const categoryOptions = [
  { value: "Comedy", label: "Comedy" },
  { value: "Biography", label: "Biography" },
  { value: "Drama", label: "Drama" },
  { value: "Horror", label: "Horror" },
  { value: "Non-Fiction", label: "Non-Fiction" },
  { value: "Romance", label: "Romance" },
  { value: "Science Fiction", label: "Science Fiction" },
  { value: "Self-Help", label: "Self-Help" },
];
const languageOptions = [
  { value: "Bangla", label: "Bangla" },
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Marathi", label: "Marathi" },
  { value: "Telugu", label: "Telugu" },
];

const SearchPage = () => {
  const {
    search,
    fetchData,
    setFetchData,
    categories,
    setCategories,
    languages,
    setLanguages,
    orderBy,
    page,
    setPage,
    limit,
  } = useSearchQueryState();

  const { data, refetch } = useGetAllAudiobooks({
    search,
    categories,
    languages,
    orderBy,
    page,
    limit,
  });

  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    refetch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [refetch, orderBy, page]);

  useEffect(() => {
    if (fetchData) {
      refetch();
      setFetchData(false);
    }
  }, [refetch, setFetchData, fetchData]);

  return (
    <Layout>
      <div className="px-2 lg:px-6">
        <div className="flex items-center justify-between mb-2 lg:mb-4 relative">
          <p className="text-xl lg:text-3xl text-white font-semibold">
            Your search results
          </p>
          <FilterAndSort setFilterOpen={setFilterOpen} refetch={refetch} />
        </div>
        <div
          className={`mb-2 lg:mb-6 text-sm ${
            filterOpen ? "" : "hidden"
          } space-y-2`}
        >
          <div className={`flex gap-2`}>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={categoryOptions}
              onChange={(selected) =>
                setCategories(selected.map((option) => option.value))
              }
              placeholder={"Select categories..."}
              className="flex-1"
            />
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={languageOptions}
              onChange={(selected) =>
                setLanguages(selected.map((option) => option.value))
              }
              placeholder={"Select languages..."}
              className="flex-1"
            />
          </div>
          <button
            onClick={() => setPage(1)}
            className="bg-blue-500 hover:bg-blue-800 text-white font-semibold px-3 py-1 rounded-md flex items-center justify-center mx-auto lg:text-lg"
          >
            Apply
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {data && data.length > 0 ? (
            data.map((item, id) => (
              <AudiobookCard key={id} audiobook={item} showCategory={true} />
            ))
          ) : (
            <div className="sticky left-1/2 -translate-x-1/2 text-red-500 my-32 mx-auto font-semibold space-y-2">
              <p className="lg:text-3xl text-xl truncate">Nothing to show 🥲</p>
              <p className="text-center text-[#e1e7f9] font-normal">
                Please refresh or search for something else
              </p>
            </div>
          )}
        </div>
        {data && data.length > 0 && (
          <div className="text-slate-200 text-center flex items-center justify-center mt-6 lg:mt-10 gap-2">
            <button
              disabled={page === 1}
              className={`flex items-center hover:border-transparent hover:bg-slate-700 transition-all duration-300 text-sm border border-slate-700 px-4 lg:px-6 py-1.5 lg:py-2 rounded-md gap-1 lg:text-xl disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500`}
              onClick={() => {
                if (page > 1) setPage((prev) => prev - 1);
              }}
            >
              <FaChevronLeft />
              <p>Back</p>
            </button>
            <button
              disabled={data?.length < limit}
              className="flex items-center hover:border-transparent hover:bg-slate-700 transition-all duration-300 text-sm border border-slate-700 px-4 lg:px-6 py-1.5 lg:py-2 rounded-md gap-1 lg:text-xl disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
              onClick={() => {
                if (data?.length >= limit) setPage((prev) => prev + 1);
              }}
            >
              <p>Next</p>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default SearchPage;
