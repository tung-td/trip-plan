import React from "react";
import BlogCard from "./HomeCard/BlogCard";
import next from "../../assets/img/next.png";
import CarouselData from "../Home_Components/CarouselData";

const BlogSection = () => {
  return (
    <div className="mt-[40px] px-[1rem] sm:mt-[70px] md:px-[8rem]">
      <h1 className="flex flex-col items-start justify-start text-[40px] text-black">
        Our Blog
        <div className="h-[3px] w-[8rem] bg-[#FF7757] sm:w-[250px]"></div>
      </h1>

      <p className="mb-[40px] mt-[20px] text-[#767E86]">
        An insight the incredible experience in the world
      </p>
      <div className="mt-8 flex h-auto grid-cols-1 sm:h-[663px]">
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
