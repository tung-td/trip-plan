import React from "react";
import Carousel from "react-multi-carousel";
import FeedBackCard from "./HomeCard/FeedBackCard";
import CarouselData from "../Home_Components/CarouselData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeedBackSection = () => {
  // Nhờ Dat làm thêm API phần review của users thay cho local
  const feedbackCards = CarouselData.map((item) => (
    <FeedBackCard
      name={item.userName}
      url={item.imageUrl}
      feedback={item.feedback}
      rating={item.rating}
      job={item.job}
    />
  ));

  const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="custom-button-group">
        <button className="Hi" onClick={() => previous()}>
          <FaArrowLeft /> sadasdasds
        </button>
        <button className="Hi" onClick={() => next()}>
          <FaArrowRight /> sadasdasds
        </button>
      </div>
    );
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mt-[70px] pl-[166px] pr-[166px]">
      <h1 className="flex flex-col text-[40px] text-black">
        Traveler’s Experiences
        <div className="h-[3px] w-[250px] bg-[#FF7757]"></div>
      </h1>

      <p className="mb-[100px] mt-[20px] flex text-[#767E86]">
        Here some awesome feedback from our travelers
      </p>

      <Carousel
        responsive={responsive}
        customButtonGroup={<CustomButtonGroup />}
        className="container mx-auto pb-6"
      >
        {feedbackCards}
      </Carousel>
    </div>
  );
};

export default FeedBackSection;
