import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FeedBackCard = (props) => {
  // Chuyển số rating thành một mảng các icon sao
  const stars = Array.from({ length: props.rating }, (_, index) => (
    <FontAwesomeIcon icon={faStar} key={index} style={{ color: "gold" }} />
  ));

  // Xử lý feedback dài hơn
  let feedbackText = props.feedback;
  if (feedbackText.length > 150) {
    feedbackText = feedbackText.substring(0, 150) + "...";
  }

  return (
    <div
      key={props.id}
      className="relative mr-[32px] flex h-[auto] w-[663px] rounded-[8px] bg-[#F5F6F7] px-[40px] py-[60px] shadow-lg"
      style={{ maxHeight: "336px" }}
    >
      <img
        src={props.url}
        alt={props.name}
        className="absolute top-[-55px] h-[100px] w-[100px] rounded-[100%] shadow-lg"
      />
      <div className="flex h-full flex-col items-start justify-between">
        <p className="text-[18px] text-[#767E86]">{feedbackText}</p>
        {props.feedback.length > 100 && (
          <p className="mb-[20px] cursor-pointer text-[#767E86]">Show more</p>
        )}
        <div className="mb-[20px] text-[18px] text-[#767E86]">{stars}</div>
        <h5 className="font-playfair text-[23px] text-[#767E86]">
          {props.name}
        </h5>
        <p className="font-playfair text-[18px] text-[#767E86]">{props.job}</p>
      </div>
    </div>
  );
};

export default FeedBackCard;
