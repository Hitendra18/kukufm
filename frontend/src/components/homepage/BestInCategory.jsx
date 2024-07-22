import { MdChevronRight } from "react-icons/md";
import HorizontalSlider from "./HorizontalSlider";

const BestInCategory = ({ category, categoryData }) => {
  return (
    <div className="w-full px-2 lg:px-6">
      <h4 className="text-lg lg:text-2xl font-semibold flex items-center mb-1 text-[#f1f1ff]">
        <MdChevronRight className="text-lg" />
        <p>Best in</p>{" "}
        <span className="font-bold ml-1">
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </span>
      </h4>
      <HorizontalSlider data={categoryData} />
    </div>
  );
};
export default BestInCategory;
