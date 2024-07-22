import { Link } from "react-router-dom";

import Rating from "./Rating";
import timeAgo from "../../utils/timeAgo";

const AudiobookCard = ({ audiobook, showCategory = false }) => {
  return (
    <Link
      to={`/audiobook/${audiobook?.id}`}
      className="min-w-40 lg:min-w-60 p-1 pb-3 max-w-min-w-40 rounded-lg shadow bg-gray-800 hover:scale-[.98] transition-all duration-300 hover:bg-[rgb(23,31,41)]"
    >
      {/* render cover image */}
      <div className="w-full h-40 lg:h-60">
        <span>
          <img
            className="p-1 rounded-t-lg w-full h-full object-cover object-center"
            src={audiobook?.cover_url}
            alt="product image"
          />
        </span>
      </div>

      {/* rest of the information */}
      <div className="px-1 w-full">

        {/* title, author and created at */}
        <div className="">
          <h5 className="text-sm lg:text-lg font-semibold tracking-tight text-white truncate">
            {audiobook?.title}
          </h5>
          <h5 className="text-xs lg:text-base font-medium tracking-tight text-[#9ca3b1] truncate">
            {audiobook?.author_name}
          </h5>
          <p className="text-[#9ca3b1] text-xs lg:text-sm">
            {timeAgo(audiobook?.created_at)}
          </p>
        </div>

        {/* rating and duration data */}
        <div className="mt-2 flex items-center justify-between">
          <div className="w-1/2 lg:w-[40%] flex items-center gap-1 lg:gap-2">
            <Rating rating={(audiobook?.rating * 100) / 5} />
            <span className="text-xs lg:text-lg text-[#9ca3b1] font-medium">
              ({audiobook?.rating_count})
            </span>
          </div>
          <p className="text-xs lg:text-base text-[#9ca3b1] font-medium pr-1">
            {audiobook?.total_duration?.hours && (
              <>{audiobook?.total_duration?.hours} hr</>
            )}{" "}
            {audiobook?.total_duration?.minutes && (
              <>{audiobook?.total_duration?.minutes} min</>
            )}
          </p>
        </div>

        {/* language and category tags */}
        <div className="mt-2 lg:mt-4 flex justify-between">
          <p className="text-[10px] lg:text-xs text-blue-800 rounded-md px-2 py-0.5 font-bold bg-blue-200">
            {audiobook?.language}
          </p>
          {showCategory && (
            <p className="text-[10px] lg:text-xs text-black rounded-md px-2 py-0.5 font-bold bg-pink-500">
              {audiobook?.category}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AudiobookCard;
