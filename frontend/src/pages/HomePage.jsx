import { useEffect } from "react";

import BestInCategory from "../components/audiobookpage/BestInCategory";
import { useGetAllAudiobooks } from "../services/query/audiobook";
import Layout from "../components/misc/Layout";

const HomePage = () => {
  const categories = { drama: [], comedy: [], horror: [] };

  const { data, refetch, isLoading } = useGetAllAudiobooks({
    categories: Object.keys(categories),
    category_rank: 10,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filterByCategory = (category) => {
    return (
      data?.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      ) || []
    );
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px] text-white text-3xl">Loading...</div>
      ) : (
        <div className="space-y-4 lg:space-y-6 ">
          {data?.length &&
            Object.keys(categories).map((item, ind) => (
              <BestInCategory
                key={ind}
                categoryData={filterByCategory(item)}
                category={item}
              />
            ))}
        </div>
      )}
    </Layout>
  );
};
export default HomePage;
