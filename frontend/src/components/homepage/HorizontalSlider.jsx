import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef } from "react";

import AudiobookCard from "../misc/AudiobookCard";

function HorizontalSlider({ data }) {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 200;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 200;
  };

  const scrollBtnClass = `rounded-full hidden opacity-70 bg-blue-300 absolute cursor-pointer hover:opacity-100 group-hover:lg:block h-6 lg:h-10 w-6 lg:w-10 `;

  return (
    <div className="flex items-center w-full relative group rounded-md overflow-hidden">
      <MdChevronLeft
        className={scrollBtnClass + "left-4"}
        onClick={slideLeft}
      />
      <div
        ref={sliderRef}
        className="flex gap-2 w-full h-full overflow-x-scroll custom-hide-scrollbar whitespace-nowrap scroll-smooth"
      >
        {data &&
          data.map((item) => <AudiobookCard key={item.id} audiobook={item} />)}
      </div>

      <MdChevronRight
        className={scrollBtnClass + "right-4"}
        onClick={slideRight}
      />
    </div>
  );
}

export default HorizontalSlider;
