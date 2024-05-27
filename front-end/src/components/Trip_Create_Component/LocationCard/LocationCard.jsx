import React from "react";
import { GrLocation } from "react-icons/gr";
import { ImAirplane } from "react-icons/im";
import { FaHotel } from "react-icons/fa";
import { IoRestaurantSharp } from "react-icons/io5";
import { TfiMoney } from "react-icons/tfi";
import { IoIosArrowForward } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import {
  setLocationItem,
  activeButton,
  getLocationArray,
} from "../../../redux/tripSlice";
import { NavLink } from "react-router-dom";

import toast from "react-hot-toast";

const LocationCard = (props) => {
  const dispatch = useDispatch();
  const day = useSelector((state) => state.tripCreate.day);
  const isDuplicate = useSelector((state) => state.tripCreate.isDuplicate);

  const tags = props.tags;
  const data = props;

  const HandelAddData = async () => {
    const newData = {
      id: data.id,
      name: data.name,
      address: data.address,
      url: data.url,
      latitude: data.latitude,
      longitude: data.longitude,
      category: data.category,
      day: day,
      description: data.description,
    };
    await dispatch(setLocationItem(newData));
    isDuplicate
      ? toast.error("This item is already in your list to day!")
      : toast.success(`Adding ${data.name} successfully!`);
    dispatch(getLocationArray(day));
    props.active();
  };

  const active = () => {
    dispatch(activeButton(true));
  };

  return (
    <div
      key={props.id}
      className="my-5 flex h-full w-full flex-col items-center rounded-xl border border-slate-400 sm:h-60 sm:flex-row"
    >
      {/* Image */}
      <div className="mx-5 h-full w-full overflow-hidden rounded-xl sm:h-5/6 sm:w-1/4">
        <img
          src={props.url}
          alt="hoian"
          className=" h-full w-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="flex h-full w-full flex-col justify-between p-[1rem] sm:h-5/6 sm:w-2/4">
        {/* Name */}
        <NavLink
          to={`/detail/${props.id}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div onClick={active} className="flex items-center hover:underline">
            <p className=" text-[21px] font-bold text-slate-800">
              {props.name}
            </p>
          </div>
        </NavLink>
        {/* Address */}
        <div className="flex items-center">
          <GrLocation className="text-[19px]" />
          <div className=" ml-3 text-base font-[450] text-slate-800">
            {props.address}
          </div>
        </div>
        {/* Distance */}
        <div className="flex items-center">
          {props.airport_distance > 0 && (
            <div className="flex items-center">
              <ImAirplane />
              <p className=" ml-3 text-sm font-[450] text-slate-900">
                {" "}
                Airport Distance: {props.airport_distance} km
              </p>
            </div>
          )}
        </div>
        {/* Descriptoion */}
        {props.category === "Hotel" ? (
          <div className="flex items-start">
            <FaHotel />
            <p className=" ml-3 text-sm font-[450] text-slate-900">
              Hotel type: {props.subcategory} star
            </p>
          </div>
        ) : props.category === "Restaurant" ? (
          <div className="flex items-start">
            <IoRestaurantSharp />
            <p className=" ml-3 text-sm font-[450] text-slate-900">
              Restaurant type: {props.subcategory}
            </p>
          </div>
        ) : (
          <div className="flex items-start">
            <TfiMoney />
            <p className=" ml-3 text-sm font-[450] text-slate-900">
              Price: {props.subcategory}{" "}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex items-center">
          {tags.map((item, index) => (
            <span
              key={index}
              className="rounded-xl border border-slate-400 px-4 py-2 text-base font-[450] text-slate-900"
              id={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      {/* Add */}
      <div className="flex h-full w-full items-center justify-center p-[1rem] sm:w-1/4">
        <button
          onClick={HandelAddData}
          className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl text-xl font-semibold text-slate-900"
        >
          <span className="relative z-10 translate-x-0 transform transition-transform group-hover:translate-x-5">
            Add to list
          </span>
          <IoIosArrowForward className="ml-8 h-10 w-10 translate-x-0 transform text-slate-900 transition-transform group-hover:translate-x-2/3" />
          <span className="inset-0transform absolute origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
