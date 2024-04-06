import React from "react";
import next from "../../../assets/img/next.png";

const BlogCard = (props) => {
  return props.id === 1 ? (
    <div className="col-span-1 row-span-3 flex h-[663px] justify-center">
      <div className=" mr-[20px] h-[663px] w-[40%] overflow-hidden rounded-xl shadow-lg">
        <img
          src={props.url}
          className=" h-full w-full object-cover"
          alt="img"
        />
      </div>
      <div className="ml-[16px] flex h-[663px] w-[40%] flex-col justify-evenly">
        <p className="font-poppins text-[54px] font-bold text-black">
          {props.name}
        </p>
        <p className="mt-5 font-poppins text-[20px] text-lg text-black">
          {props.des}
        </p>
        <a className="mt-[20px] font-[400] text-[#FF7757]">Read more</a>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default BlogCard;
