import React from "react";
import bana from "../../../../assets/TripImg/bana.jpg";
import hoian from "../../../../assets/TripImg/hoian.jpg";
import dragonBridge from "../../../../assets/TripImg/dragonbrigde.jpeg";
import francevillage from "../../../../assets/TripImg/francevillage.jpg";
import pagoda from "../../../../assets/TripImg/pagoda.jpg";
import nguhanhson from "../../../../assets/TripImg/nguhanhson.jpg";
import { HiOutlineCalendar } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa6";

const TripInfo = (props) => {
  const imgList = [
    hoian,
    bana,
    dragonBridge,
    francevillage,
    pagoda,
    nguhanhson,
  ];
  const randomItem = imgList[Math.floor(Math.random() * imgList.length)];
  return (
    <div className="relative mt-[34px]">
      <div className="relative h-80 overflow-hidden rounded-xl">
        <img
          src={randomItem}
          alt="Trip Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-r from-black to-transparent opacity-40"></div>
      </div>
      <div className="absolute bottom-2 mx-8 my-8 w-1/3">
        <h1 className=" text-[40px] font-[800] text-white">{props.name}</h1>
        <div className="mt-4 flex items-center justify-between text-white">
          <div className="flex items-center text-[16px] font-[600]">
            <HiOutlineCalendar className="mr-[5px] text-[21px]" />
            {props.firstDay}
            <FaArrowRight className="mx-[5px] text-[18px]" />
            {props.lastDay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
