import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SpecialCard from "./HomeCard/SpecialCard";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SpecialOffer = () => {
  const locationData = useSelector((state) => state.location.locationList);
  
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
    <div className="mt-[70px] pl-[166px] pr-[166px]">
      <h1 className="flex flex-col items-end justify-end text-[40px] text-black">
        Special Offer
        <div className="h-[3px] w-[250px] bg-[#FF7757]"></div>
      </h1>

      <p className="mb-[40px] mt-[20px] flex justify-end text-[#767E86]">
        Check out our special offer and discounts
      </p>
      <Carousel responsive={responsive} className="container mx-auto mt-8 pb-6">
        {specialCards}
      </Carousel>
    </div>
  );
};

export default SpecialOffer;
