import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { activeButton } from "../../../redux/tripSlice";
import { useDispatch } from "react-redux";

const TripCard = (props) => {
  const dispatch = useDispatch();

  const hide = () => {
    dispatch(activeButton(false));
  };

  return (
    <div
      key={props.id}
      onClick={hide}
      className="relative mr-[40px] flex h-[510px] w-[20rem] flex-col items-start justify-end rounded-[26px] p-[24px] shadow-lg"
      style={{
        backgroundImage: `url(${props.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h5 class="flex flex-col font-playfair text-xl font-medium text-white">
        {props.name}
        <p class="mt-[10px] flex items-center text-[20px] text-white">
          <FaLocationDot className="mr-2" />
          {props.location}
        </p>
      </h5>
    </div>
  );
};

export default TripCard;
