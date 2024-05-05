import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Map from "../components/Trip_Create_Component/TripCreateCard/Map";
import Typist from "react-typist";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RxPencil2 } from "react-icons/rx";

const AITripResult = () => {
  const location = useLocation();
  console.log("sadasdas");
  console.log(location);
  const navigate = useNavigate();
  const tripData = location?.state;

  const destination = tripData.destination;
  const startDate = tripData.startDate;
  const endDate = tripData.endDate;
  const dayLength = tripData.dayLength;
  const travelers = tripData.travelers;
  const activities = tripData.activities;

  const fullResData = tripData.tripData.data;
  const tripPlan = tripData.tripData.data.tripPlan;

  const [showContentAfterTyping, setShowContentAfterTyping] = useState(false);
  const [showDes, setShowDes] = useState({});

  const toggleDescription = (index) => {
    setShowDes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      <div className="trip-plan-container py-[20px]">
        <div className="relative mb-[40px] flex w-full justify-center border-b pb-[20px] font-[600]">
          {destination} Itinerary
          <div
            className="absolute right-[30px] text-[30px] hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <IoCloseOutline />
          </div>
        </div>
        <div className="m-auto flex w-[1300px] justify-center">
          <div className="max-w-[52%] pl-[20px] pr-[60px]">
            <div className="mb-[24px] border-b pb-[24px]">
              <p className="flex items-center text-[12px] font-[400] opacity-[70%]">
                <div className="mr-[7px] rounded-full bg-[#4A92DE] p-[6px] text-[13px] text-white opacity-100">
                  <FaLocationDot />
                </div>
                This trip is powered by AI.
              </p>
              <h2 className="mb-[20px] text-[28px] font-[700]">
                Your trip to {destination} for {dayLength} days
              </h2>
              <Typist
                cursor={{ show: false }}
                avgTypingDelay={10}
                stdTypingDelay={3}
                startDelay={0}
                onTypingDone={() => {
                  setShowContentAfterTyping(true);
                }}
              >
                <p>{fullResData.introduction}</p>
              </Typist>
            </div>
            {showContentAfterTyping && (
              <>
                <div className="mb-[24px] min-h-[480px] border-b pb-[24px]">
                  <h2>Places to stay</h2>
                  <p className="opacity-[70%]">
                    We've also recommended some places to stay during your trip
                    with <span className="lowercase">{travelers}</span>.
                  </p>
                  <h2 className="font-[400] opacity-[70%]">loading........</h2>
                </div>
                <div className="order-b mb-[24px] pb-[24px]">
                  {tripPlan.map((dayPlan, index) => (
                    <div key={index}>
                      <h3>{dayPlan.day}</h3>
                      <p>{dayPlan.description}</p>
                      <ul className="mb-0 p-0">
                        {dayPlan.locations.map((location, index) => (
                          <li key={index} className="relative flex">
                            <div className="mr-[20px] flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black p-[16px] text-[12px] text-white">
                              {index + 1}
                            </div>
                            <div className="mb-[40px] mt-[6px] w-full border-b pb-[10px]">
                              <h4
                                className="mb-[12px] flex items-center text-[18px] font-[640] hover:cursor-pointer hover:underline"
                                onClick={() => toggleDescription(index)}
                              >
                                <div className="mr-[7px]">
                                  <RxPencil2 />
                                </div>
                                {location.locationName}
                              </h4>
                              {showDes[index] && (
                                <p>{location.locationDescription}</p>
                              )}
                            </div>
                            {index !== dayPlan.locations.length - 1 && (
                              <div
                                className={`absolute left-[16px] top-[44px] -translate-x-1/2 transform ${showDes[index] ? "h-[60%]" : "h-[35px]"}`}
                                style={{
                                  backgroundColor: "black",
                                  width: "0.1px",
                                }}
                              ></div>
                            )}
                            <div
                              className="mt-[6px] h-[15px] text-[27px]"
                              onClick={() => toggleDescription(index)}
                            >
                              {showDes[index] ? (
                                <MdOutlineKeyboardArrowUp />
                              ) : (
                                <MdOutlineKeyboardArrowDown />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p>{fullResData.conclusion}</p>
              </>
            )}
          </div>
          <div className="sticky top-20 h-[78vh] w-[40%] py-[30px]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITripResult;
