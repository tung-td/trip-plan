import React from "react";
import BlogCard from "./HomeCard/BlogCard";
import next from "../../assets/img/next.png";
import CarouselData from "../Home_Components/CarouselData";

const BlogSection = () => {
  return (
    <div className="mt-[70px] px-[1rem] md:px-[8rem]">
      <h1 className="flex flex-col items-start justify-start text-[40px] text-black">
        Our Blog
        <div className="h-[3px] w-[250px] bg-[#FF7757]"></div>
      </h1>

      <p className="mb-[40px] mt-[20px] text-[#767E86]">
        An insight the incredible experience in the world
      </p>
      <div className="mt-8 flex h-[663px] grid-cols-1">
        {CarouselData.map((item) => (
          <BlogCard
            id={item.id}
            url={item.imageUrl}
            name={item.namePlace}
            des={item.feedback}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
