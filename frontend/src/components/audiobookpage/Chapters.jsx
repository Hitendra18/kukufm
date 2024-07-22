import { CiPause1, CiPlay1 } from "react-icons/ci";

const Chapters = ({
  data,
  setSelectedChapter,
  isPlaying,
  setIsPlaying,
  selectedChapter,
}) => {
  return (
    <div className="lg:flex-grow pb-2">
      {data && data.length > 0 && (
        <div className="flex flex-col justify-between lg:gap-0.5 gap-0 mb-6 lg:mb-0">
          <div className="flex flex-col lg:gap-0.5 gap-0 pt-4 flex-grow">
            {/* render all of the chapters */}
            {data.map((item, ind) => (
              <button
                onClick={() => {
                  setIsPlaying(true);
                  setSelectedChapter(item);
                }}
                key={ind}
                className={`flex rounded-lg lg:mx-2 mx-0 justify-between items-center px-2 py-4 lg:py-3 lg:px-6 hover:bg-slate-600/40 hover:text-white font-semibold text-lg ${
                  isPlaying && selectedChapter?.id === item?.id
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="border h-8 w-8 lg:h-10 lg:w-10 lg:p-2 p-1.5 rounded-full">
                    {/* toggle play/pause icon */}
                    {isPlaying && selectedChapter?.id === item?.id ? (
                      <CiPause1 className="h-full w-full" />
                    ) : (
                      <CiPlay1 className="h-full w-full" />
                    )}
                  </div>
                  <p>{item?.chapter_name}</p>
                </div>
                {/* render formatted duration of track */}
                <p>
                  {item?.duration?.hours && <>{item?.duration?.hours}:</>}
                  {item?.duration?.minutes && (
                    <>
                      {item?.duration?.minutes < 10 ? (
                        <>0{item?.duration?.minutes}</>
                      ) : (
                        <>{item?.duration?.minutes}</>
                      )}
                      :
                    </>
                  )}
                  {item?.duration?.seconds && (
                    <>
                      {item?.duration?.seconds < 10 ? (
                        <>0{item?.duration?.seconds}</>
                      ) : (
                        <>{item?.duration?.seconds}</>
                      )}
                    </>
                  )}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Chapters;
