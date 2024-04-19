import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TripCard from "./HomeCard/TripCard";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HomeCarousel = () => {
  const locationData = useSelector((state) => state.location.locationList);
  console.log("DATA LOACATION: ", locationData)
  const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="custom-button-group absolute right-[166px] top-[40px]">
        <button
          className="mr-[10px] rounded-[12px] bg-[#172432] p-[20px] text-white"
          onClick={() => previous()}
        >
          <FaArrowLeft />
        </button>
        <button
          className="ml-[10px] rounded-[12px] bg-[#FF7757] p-[20px] text-white"
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

  const style = {
    color: "red !important",
    overflow: "unset !important",
  };

  const tripCards = locationData.map((item) => (
    <NavLink to={`/detail/${item.id}`}>
      <TripCard
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
    <div className="relative mt-[70px] pl-[166px] pr-[166px]">
      <h1 className="flex flex-col items-start justify-end text-[40px] text-black">
        Popular Destinations
        <div className="mt-[10px] h-[3px] w-[250px] bg-[#FF7757]"></div>
      </h1>

      <p className="mb-[40px] mt-[20px] text-[#767E86]">
        Most popular destinations around the world, from historical places to
        natural wonders.
      </p>

      <Carousel
        responsive={responsive}
        className="container mx-auto mt-8 pb-6"
        style={style}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButtonGroup />}
      >
        {tripCards}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
