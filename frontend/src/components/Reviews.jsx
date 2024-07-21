import { IoClose } from "react-icons/io5";
import timeAgo from "../utils/timeAgo";
import Rating from "./Rating";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { usePostReview } from "../services/mutation/review";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Reviews = ({ data }) => {
  const { id: audiobook_id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const { mutate: postReviewMutate } = usePostReview(() => {
    toast.success("Posted your review successfully");
    setShowPopup(false);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const full_name = e.target[0].value;
    const review_text = e.target[1].value;
    if (!rating || !full_name || !review_text) {
      toast.error("All fields are required");
      return;
    }

    postReviewMutate({ audiobook_id, full_name, review_text, rating });
  };
  return (
    <div className="lg:flex-grow px-4 pt-2 pb-2">
      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 w-full flex justify-center items-center mb-2 text-white text-xl py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
      >
        Post Review
      </button>
      <div
        className={`w-[80%] lg:w-[500px] text-white p-2 pb-4 fixed rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111827] space-y-4 ${
          showPopup ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-slate-200">
            Post your review
          </p>
          <button
            onClick={() => setShowPopup(false)}
            className="h-8 w-8 p-1 bg-blue-300/20 rounded-full hover:bg-blue-300/30"
          >
            <IoClose className="h-full w-full" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="shadow-md rounded-lg">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your name..."
              className="p-2 border bg-slate-800 outline-none border-gray-300 rounded"
            />
            <textarea
              name="review"
              rows="4"
              placeholder="Write your review..."
              className="p-2 border bg-slate-800 outline-none border-gray-300 rounded resize-none"
            ></textarea>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(starRating)}
                    onMouseEnter={() => setHover(starRating)}
                    onMouseLeave={() => setHover(rating)}
                    className="text-2xl focus:outline-none"
                  >
                    <FaStar
                      color={
                        starRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                    />
                  </button>
                );
              })}
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-2">
        {data &&
          data.length > 0 &&
          data.map((item, ind) => (
            <div
              key={ind}
              className="text-white bg-slate-600/40 rounded-lg p-2"
            >
              {/* review data */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden">
                  <img
                    src={item?.avatar}
                    className="h-full w-full object-cover object-center"
                    alt="reviewer avatar"
                  />
                </div>
                <div className="">
                  <p className="font-bold">{item?.full_name}</p>
                  <div className="h-4 flex items-center gap-1">
                    <div className="w-[70px]">
                      <Rating rating={(item?.rating * 100) / 5} />
                    </div>
                    <p className="text-nowrap text-slate-400">
                      {timeAgo(item?.created_at)}
                    </p>
                  </div>
                </div>
              </div>
              {/* review text */}
              <div className="text-sm">{item?.review_text}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Reviews;
