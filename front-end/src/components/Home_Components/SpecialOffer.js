import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SpecialCard from "./HomeCard/SpecialCard";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SpecialOffer = () => {
  const locationData = useSelector((state) => state.location.locationList);

  const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="custom-button-group absolute left-[27px] top-[11px] sm:left-[166px] sm:top-[40px]">
        <button
          className="mr-[10px] rounded-[12px] bg-[#172432] p-[1rem] text-white md:p-[20px]"
          onClick={() => previous()}
        >
          <FaArrowLeft />
        </button>
        <button
          className="ml-[10px] rounded-[12px] bg-[#FF7757] p-[1rem] text-white md:p-[20px]"
          onClick={() => next()}
        >
          <FaArrowRight />
        </button>
      </div>
    );
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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

  const specialCards = locationData.map((item) => (
    <NavLink to={`/detail/${item.id}`}>
      <SpecialCard
        id={item.id}
        name={item.name}
        url={item.image}
        location={item.address}
        tag={item.tag.map((item, index) => {
          return item.name;
        })}
      />
    </NavLink>
  ));

  return (
    <div className="relative mt-[60px] px-[1rem] sm:mt-[10px] md:px-[8rem]">
      <h1 className="flex flex-col items-end justify-end text-[29px] text-black sm:text-[40px]">
        Special Offer
        <div className="mt-[10px] h-[3px] w-[10rem] bg-[#FF7757] sm:w-[250px]"></div>
      </h1>

      <p className="mb-[40px] mt-[20px] flex justify-end text-[#767E86]">
        Check out our special offer and discounts
      </p>
      <Carousel
        responsive={responsive}
        className="w-100% container mx-auto mt-8 overflow-hidden bg-white pb-6"
        arrows={false}
        renderButtonGroupOutside={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        swipeable={true}
        draggable={true}
        infinite={true}
        customButtonGroup={<CustomButtonGroup />}
      >
        {specialCards}
      </Carousel>
    </div>
  );
};

export default SpecialOffer;
