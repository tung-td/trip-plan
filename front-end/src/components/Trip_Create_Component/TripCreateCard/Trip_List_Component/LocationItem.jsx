import React from "react";
import img from "../../../../assets/img/hoian.jpg";
import { GrLocation } from "react-icons/gr";
import trashcan from "../../../../assets/TripImg/trashbin.png";
import { FaRegStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import {
  deleteLocationItem,
  getLocationArray,
} from "../../../../redux/tripSlice";
import { useDispatch } from "react-redux";

const LocationItem = (props) => {
  const dispatch = useDispatch();

  console.log("props", props);

  const deleteLocation = {
    id: props.id,
    day: props.day,
  };

  const handleDelete = () => {
    dispatch(deleteLocationItem(deleteLocation));
    dispatch(getLocationArray(deleteLocation.day));
  };
  return (
    <div className=" cursor-pointer">
      <div className="mt-5 flex">
        {/* Index item */}
        <div className="flex flex-col items-center">
          <p className="rounded-full bg-black px-[13px] py-[5px] text-white">
            {props.index + 1}
          </p>
          <div class="h-full w-0 border-l-2 border-dotted border-gray-400"></div>
        </div>
        {/* Item info */}
        <div className="border-1 relative ml-[80px] flex h-[191px] w-[726px] rounded-[8px] border-[#666666]">
          {props.url ? (
            <div className="h-full w-[206px] overflow-hidden rounded-[8px]">
              <img
                src={props.url}
                alt="Trip Image"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-full w-[206px] overflow-hidden rounded-[8px]">
              <img
                src={img}
                alt="Trip Image"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="ml-5 flex w-3/4 flex-col gap-[12px] p-[15px]">
            <h1 className="text-[16px] font-[700]">{props.name}</h1>
            <div className="flex items-center border-b border-[#ccc] pb-[10px]">
              <GrLocation />
              <div className="ml-[5px] text-[14px]">{props.address}</div>
            </div>
            <div className="text-[12px] font-[400]">
              {props.description
                ? props.description
                : "Morning Glory Restaurant in Hoi An is an excellent eatery that will surely satisfy your love for good ..."}
            </div>
            <div className="text-[12px] font-[700] underline">Read more</div>
          </div>
          <div
            onClick={handleDelete}
            className="absolute right-[10px] top-[10px] h-7 w-7 cursor-pointer rounded-full p-[2px] hover:bg-[red] hover:text-white"
          >
            <IoClose className="text-[25px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationItem;
