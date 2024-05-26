import React from "react";
import next from "../../../assets/img/next.png";

const BlogCard = (props) => {
  return props.id === 1 ? (
    <div className="col-span-1 row-span-3 flex h-auto flex-col justify-center sm:h-[663px] sm:flex-row">
      <div className=" mr-[20px] h-[663px] overflow-hidden rounded-xl shadow-lg sm:w-[40%]">
        <img
          src={props.url}
          className=" h-full w-full object-cover"
          alt="img"
        />
      </div>
      <div className="flex h-[663px] flex-col justify-evenly sm:ml-[16px] sm:w-[40%]">
        <p className="font-poppins text-[29px] font-bold text-black sm:text-[54px]">
          {props.name}
        </p>
        <p className="font-poppins text-[20px] text-lg text-black sm:mt-5">
          {props.des}
        </p>
        <a className="font-[400] text-[#FF7757] sm:mt-[20px]">Read more</a>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default BlogCard;
