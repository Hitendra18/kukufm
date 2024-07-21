import { BsFilter, BsSortDown } from "react-icons/bs";
import { useSearchQueryState } from "../../contexts/useSearchQueryState";

const orderByOptions = [
  { label: "Highest Rated", value: "highest_rated" },
  { label: "Lowest Rated", value: "lowest_rated" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Longest", value: "longest" },
  { label: "Shortest", value: "shortest" },
];

const FilterAndSort = ({ setFilterOpen }) => {
  const { setOrderBy } = useSearchQueryState();

  return (
    <div>
      <div className="flex gap-2 lg:gap-4">
        <button
          onClick={() => setFilterOpen((prev) => !prev)}
          className="px-3 py-1.5 lg:px-4 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-500 bg-gray-900"
        >
          <BsFilter className="h-6 w-6 lg:h-8 lg:w-8" />
        </button>

        <div className="px-3 py-1.5 lg:px-4 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-500 bg-gray-900 relative group text-start">
          <BsSortDown className="h-6 w-6 lg:h-8 lg:w-8" />

          <ul className="absolute z-20 bg-gray-900 text-gray-400 text-sm lg:text-xl right-0 top-full w-32 lg:w-56 rounded-lg py-2 overflow-hidden hidden group-hover:block group-focus:block">
            {orderByOptions.map((item, ind) => (
              <button
                key={ind}
                onClick={() => setOrderBy(item.value)}
                className="hover:bg-gray-700 hover:text-gray-300 pl-2 lg:pl-3 py-1 w-full text-start"
              >
                {item.label}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default FilterAndSort;
