import React, { useState, useEffect, useRef, useCallback } from "react";
import LocationCard from "./LocationCard/LocationCard";
import { useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import "./MultiRangeSlider/MultiRangeSlider.css";

const TripCreateModel = (props) => {
  const locationData = useSelector((state) => state.location.locationList);
  const hotelList = locationData.filter(
    (location) => location.category.name === "Hotel",
  );
  const restaurantList = locationData.filter(
    (location) => location.category.name === "Restaurant",
  );
  const sightSeeingList = locationData.filter(
    (location) => location.category.name === "Sight Seeing",
  );

  const [choicesActive, setChoicesActive] = useState(false);
  const handleActiveChoices = () => {
    setChoicesActive((prev) => !prev);
  };

  const [selectedValue, setSelectedValue] = useState(1);

  const handleChange = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
  };

  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(5);
  let min = 1;
  let max = 5;
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  const [listType, setListType] = useState(hotelList);
  const [selectedCategory, setSelectedCategory] = useState("Hotel");

  const changeCategory = (category) => {
    if (category === "Hotel") setListType(hotelList);
    if (category === "Restaurant") setListType(restaurantList);
    if (category === "SightSeeing") setListType(sightSeeingList);

    setSelectedCategory(category);
  };

  return (
    <div className="fixed inset-0 z-50  ">
      {/* Overlay */}
      <div class="absolute inset-0 bg-black opacity-40"></div>
      {/* Main Contain */}
      <div className="h-full w-full">
        <div className="custom-scrollbar-style absolute left-1/2 top-1/2 h-3/4 w-full -translate-x-1/2 -translate-y-1/2 transform overflow-y-scroll rounded-xl bg-white px-10 px-[1rem] pt-0 sm:w-3/4 sm:py-4">
          <div className=" sticky top-3 z-50 mt-[20px] bg-white p-[12px] py-4 shadow-lg">
            <div
              onClick={props.active}
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 hover:bg-slate-200"
            >
              <GrClose />
            </div>
            <div className="flex items-center">
              <button
                onClick={() => changeCategory("Hotel")}
                className={`mr-8 rounded-lg border border-slate-400 px-4 py-1 ${selectedCategory === "Hotel" ? "bg-slate-900 text-white" : ""} `}
              >
                Hotel
              </button>
              <button
                onClick={() => changeCategory("Restaurant")}
                className={`mr-8 rounded-lg border border-slate-400 px-4 py-1 ${selectedCategory === "Restaurant" ? "bg-slate-900 text-white" : ""} `}
              >
                Restaurant
              </button>
              <button
                onClick={() => changeCategory("SightSeeing")}
                className={`mr-8 rounded-lg border border-slate-400 px-4 py-1 ${selectedCategory === "SightSeeing" ? "bg-slate-900 text-white" : ""} `}
              >
                Sight Seeing
              </button>
            </div>
          </div>
          <div className=" mt-5 h-px  bg-slate-400"></div>
          <div className="my-5">
            <span className="text-lg font-bold">Top Recomendation</span>
          </div>
          {/* Dropdonw */}
          <div className="">
            {listType.map((item, index) => (
              <div key={index}>
                <LocationCard
                  id={item.id}
                  name={item.name}
                  address={item.address}
                  url={item.image}
                  tags={item.tag}
                  category={item.category.name}
                  subcategory={item.subcategory}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  airport_distance={item.airport_distance}
                  active={props.active}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCreateModel;
