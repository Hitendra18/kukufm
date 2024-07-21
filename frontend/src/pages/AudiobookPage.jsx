import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useGetSingleAudiobook } from "../services/query/audiobook";
import { IoHomeOutline } from "react-icons/io5";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { FaHeadphonesAlt, FaRegComments } from "react-icons/fa";
import timeAgo from "../utils/timeAgo";
import Chapters from "../components/Chapters";
import Reviews from "../components/Reviews";
import AudioPlayer from "../components/AudioPlayer";

const AudiobookPage = () => {
  const { id } = useParams();
  const { data } = useGetSingleAudiobook(id);
  const [activeTab, setActiveTab] = useState("chapters");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (data && data.chapters && data.chapters.length > 0) {
      setSelectedChapter(data?.chapters[0]);
    }
  }, [data]);

  return (
    <Layout hideFooter={true}>
      {data && Object.keys(data).length === 0 ? (
        <div className="text-red-500 my-44 text-center font-semibold space-y-2 lg:text-3xl text-xl flex flex-col mx-auto">
          <p>We could&#39;t find this audiobook</p>
          <Link
            to="/"
            className="text-white underline text-base flex justify-center items-center gap-1"
          >
            <IoHomeOutline />
            <span>Go Home</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="lg:h-[calc(100vh-100px)] flex flex-col lg:flex-row px-2 lg:px-0">
            {/* left */}
            <div className="flex flex-col items-center lg:px-4 lg:overflow-scroll lg:overflow-x-auto custom-hide-scrollbar lg:min-w-[400px] lg:max-w-[410px]">
              {/* cover, title and author */}
              <div className="flex flex-col items-center">
                <div className="h-48 w-48 lg:h-60 lg:w-60 rounded-lg overflow-hidden">
                  <img
                    src={data?.audiobook?.cover_url}
                    className="full h-full object-cover object-center"
                    alt="audiobook cover"
                  />
                </div>
                <h2 className="text-2xl text-center text-[#d7e7f7] font-medium lg:mt-4 mt-2">
                  {data?.audiobook?.title}
                </h2>
                <h2 className="text-lg text-center text-gray-500 font-medium">
                  {data?.audiobook?.author_name}
                </h2>
              </div>
              {/* rating, category, duration, language */}
              <div className="w-full px-4 lg:px-0">
                <div className="flex items-center justify-center mt-3 lg:mt-2 gap-2">
                  <div className="w-[100px]">
                    <Rating rating={(data?.audiobook?.rating * 100) / 5} />
                  </div>
                  <span className="text-lg text-[#9ca3b1] font-medium">
                    ({data?.audiobook?.rating_count})
                  </span>
                </div>
                <div className="flex justify-between mt-4 text-white">
                  <div className="flex flex-col items-center">
                    <p className="text-gray-400 font-medium">Category</p>
                    <p className="text-sm">{data?.audiobook?.category}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-400 font-medium">Duration</p>
                    <p className="text-sm">
                      {data?.audiobook?.total_duration?.hours && (
                        <>{data?.audiobook?.total_duration?.hours} hr</>
                      )}{" "}
                      {data?.audiobook?.total_duration?.minutes && (
                        <>{data?.audiobook?.total_duration?.minutes} min</>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-400 font-medium">Posted</p>
                    <p className="text-sm">
                      {timeAgo(data?.audiobook?.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-400 font-medium">Language</p>
                    <p className="text-sm">{data?.audiobook?.language}</p>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="w-full mt-4">
                <h2 className="text-xl text-gray-400 font-medium">
                  Description
                </h2>
                <p className="text-white text-justify text-base">
                  {data?.audiobook?.description}
                </p>
              </div>
            </div>
            {/* right */}
            <div className="lg:flex-grow lg:border-l lg:flex lg:flex-col border-l-gray-500">
              {/* tab */}
              <div className="mt-4 lg:-mt-2">
                <div className="border-b border-gray-700">
                  <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-400">
                    <li className="flex-1">
                      <button
                        className={`inline-flex w-full items-center justify-center py-2 lg:p-2 border-b-2 border-transparent rounded-t-lg text-lg border-gray-300 hover:text-blue-300 hover:border-blue-300 group transition-all duration-200 ${
                          activeTab === "chapters"
                            ? "text-white border-white"
                            : ""
                        }`}
                        onClick={() => setActiveTab("chapters")}
                      >
                        <FaHeadphonesAlt />{" "}
                        <span className="ml-2">Chapters</span>
                      </button>
                    </li>
                    <li className="flex-1">
                      <button
                        className={`inline-flex w-full items-center justify-center py-2 lg:p-2 border-b-2 border-transparent rounded-t-lg text-lg border-gray-300 hover:text-blue-300 hover:border-blue-300 group transition-all duration-200 ${
                          activeTab === "reviews"
                            ? "text-white border-white"
                            : ""
                        }`}
                        onClick={() => setActiveTab("reviews")}
                      >
                        <FaRegComments /> <span className="ml-2">Reviews</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* content */}
              <div className="lg:flex-grow lg:overflow-scroll custom-hide-scrollbar pb-2 lg:pb-0">
                <div className="lg:h-full lg:flex lg:flex-col">
                  {activeTab === "chapters" ? (
                    <Chapters
                      data={data?.chapters}
                      setSelectedChapter={setSelectedChapter}
                      isPlaying={isPlaying}
                      selectedChapter={selectedChapter}
                      setIsPlaying={setIsPlaying}
                    />
                  ) : (
                    <Reviews data={data?.reviews} />
                  )}
                  <AudioPlayer
                    selectedChapter={selectedChapter}
                    setSelectedChapter={setSelectedChapter}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    data={data?.chapters}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};
export default AudiobookPage;
