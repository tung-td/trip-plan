import React, { useEffect, useState } from "react";
import "chartjs-plugin-datalabels";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLocationItem, getLocationArray } from "../redux/tripSlice";

import { FaStar } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { CiAirportSign1 } from "react-icons/ci";
import { IoHappyOutline } from "react-icons/io5";
import { RiCustomerService2Line, RiServiceLine } from "react-icons/ri";
import { FaLeaf } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { RiCupFill } from "react-icons/ri";
import { IoWine } from "react-icons/io5";
import {
  MdOutlineRoomService,
  MdOutlinePool,
  MdOutlineRestaurant,
} from "react-icons/md";
import Map from "../components/Trip_Create_Component/TripCreateCard/Map";

const LocationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.user.id);
  const activeStatus = useSelector((state) => state.tripCreate.active);
  const day = useSelector((state) => state.tripCreate.day);
  const [allReview, setAllReview] = useState([]);

  const { filterby } = useParams();
  const locationDetail = useSelector((state) => state.location.locationList);

  const locationDisplay = locationDetail.filter(
    (location) => location.id === parseInt(filterby),
  )[0];

  console.log("location");
  console.log(locationDisplay);

  useEffect(() => {
    fetch(`http://localhost:8000/getcomment/${parseInt(filterby)}`)
      .then((response) => response.json())
      .then((result) => setAllReview(result.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(allReview);

  return (
    <div className="mx-8 mt-8 px-[150px]">
      {/* {loginRequiredActive && <LoginRequired active={activeLoginRequired} />} */}

      {/* Title */}
      <div className="flex justify-between">
        <div className="">
          <div className="flex items-center">
            <h1 className="mr-[20px] text-[24px] font-[640]">
              {locationDisplay.name}
            </h1>
            <span className="flex items-center text-[12px]">
              <FaStar className="text-[#FF7757]" />
              <FaStar className="text-[#FF7757]" />
              <FaStar className="text-[#FF7757]" />
              <FaStar className="text-[#FF7757]" />
              <FaStar className="text-[#FF7757]" />
              <span className="ml-[5px]">5 Star Hotel</span>
            </span>
          </div>
          <div className="mt-[15px] flex items-center text-[14px]">
            <span className="mr-[5px]">
              <FaLocationDot />
            </span>
            {locationDisplay.address}
          </div>
          <div className="mt-[10px] flex items-center text-[14px]">
            <div className="rounded border p-[5px] px-[10px]">4.2</div>
            <p className="mb-0 ml-[10px]">
              <span className="font-bold">Very Good</span> 371 reviews
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-right text-[32px] font-bold text-[#FF7757]">
            $240<span className="text-[16px]">/night</span>
          </div>
          <div className="flex">
            <div className="border-1 flex cursor-pointer items-center rounded border-[#FF7757] px-[16px] py-[8px] hover:opacity-70">
              <IoMdShare />
            </div>
            <div className="border-1 mx-[15px] flex cursor-pointer items-center rounded border-[#FF7757] px-[16px] py-[8px] hover:opacity-70">
              <FaRegHeart />
            </div>
            <button className="rounded bg-[#FF7757] px-[35px] py-[8px] text-white hover:opacity-70">
              Book now
            </button>
          </div>
        </div>
      </div>

      {/* IMG */}
      <div className="relative mt-[33px] flex h-[550px] justify-between">
        <div className="mr-[4px] w-[50%] cursor-pointer" dir="ltr">
          <img
            className="h-[550px] w-[100%] rounded-s-lg"
            src={locationDisplay.image}
            alt={locationDisplay.image}
          ></img>
        </div>
        <div className="ml-[4px] flex h-[100%] w-[50%] cursor-pointer flex-wrap justify-around">
          <img
            className="mb-[8px] mr-[8px] w-[49%]"
            src={locationDisplay.image}
            alt={locationDisplay.image}
          ></img>
          <img
            className="mb-[8px] w-[49%] rounded-tr-lg"
            src={locationDisplay.image}
            alt={locationDisplay.image}
          ></img>
          <img
            className="mr-[8px] w-[49%]"
            src={locationDisplay.image}
            alt={locationDisplay.image}
          ></img>
          <img
            className="w-[49%] rounded-br-lg"
            src={locationDisplay.image}
            alt={locationDisplay.image}
          ></img>
        </div>
        <button className="absolute bottom-[16px] right-[16px] rounded bg-[#FF7757] px-[16px] py-[8px] text-white hover:opacity-70">
          View all photos
        </button>
      </div>

      <div className="my-[64px] h-[1px] w-full bg-[#ccc]"></div>

      {/* Des */}
      <div>
        <h1 className="mb-[16px] text-[20px]">Overview</h1>
        <p className="opacity-75">
          {locationDisplay.description.length > 1
            ? locationDisplay.description
            : "111Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel, which also served as Foreign Affairs Palace 120 years ago and is hosting its guests by assuming this hospitality mission. With its 452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18 meeting rooms including 4 dividable ones and 3 terraces with Bosphorus view, Istanbuls largest terrace with Bosphorus view (4500 m2) and latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is destined to be the popular attraction point of the city. Room and suite categories at various sizes with city and Bosphorus view, as well as 68 separate luxury suites, are offered to its special guests as a wide variety of selection."}
        </p>
      </div>

      {/* Rate */}
      <div className="flex w-full">
        <div className="mr-[16px] flex h-[145px] w-[166px] flex-col justify-between rounded bg-[#FF7757] p-[16px] pr-[64px] font-[500]">
          <div className="text-[32px] font-bold">4.2</div>
          <div>
            Very good <p>371 reviews</p>
          </div>
        </div>
        <div className="border-1 mr-[16px] flex h-[145px] w-[166px] flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500]">
          <div>
            <CiAirportSign1 className="text-[32px] font-bold" />
          </div>
          <div>{locationDisplay.airport_distance} km to airport</div>
        </div>
        <div className="border-1 mr-[16px] flex h-[145px] w-[166px] flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500]">
          <div>
            <IoHappyOutline className="text-[32px] font-bold" />
          </div>
          <div>{locationDisplay.positive} positive</div>
        </div>
        <div className="border-1 mr-[16px] flex h-[145px] w-[166px] flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500]">
          <div>
            <RiCustomerService2Line className="text-[32px] font-bold" />
          </div>
          <div>{locationDisplay.convenient} convenient</div>
        </div>
        <div className="border-1 mr-[16px] flex h-[145px] w-[166px] flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500]">
          <div>
            <RiServiceLine className="text-[32px] font-bold" />
          </div>
          <div>{locationDisplay.service} service</div>
        </div>
      </div>

      <div className="my-[64px] h-[1px] w-full bg-[#ccc]"></div>
      {/* Amenities */}
      <div className="mb-[32px] text-[20px] font-[640]">Amenities</div>
      <div className="flex w-1/2 justify-between">
        <div className="flex flex-col">
          <div className="flex font-[500]">
            <FaLeaf className="mb-[24px] mr-[5px] text-[20px]" />
            Spa and wellness center
          </div>
          <div className="flex font-[500]">
            <IoIosFitness className="mb-[24px] mr-[5px] text-[20px]" />
            Fitness center
          </div>
          <div className="flex font-[500]">
            <RiCupFill className="mb-[24px] mr-[5px] text-[20px]" />
            Tea/coffee machine
          </div>
          <div className="flex font-[500]">
            <IoWine className="mb-[24px] mr-[5px] text-[20px]" />
            Bar/Lounge
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex font-[500]">
            <MdOutlineRoomService className="mb-[24px] mr-[5px] text-[20px]" />
            Room service
          </div>
          <div className="flex font-[500]">
            <MdOutlinePool className="mb-[24px] mr-[5px] text-[20px]" />
            Outdoor pool
          </div>
          <div className="flex font-[500]">
            <MdOutlineRestaurant className="mb-[24px] mr-[5px] text-[20px]" />
            Restaurant
          </div>
          <div className="flex font-[500] text-[#FF7757]">+24 more</div>
        </div>
      </div>

      <div className="my-[64px] h-[1px] w-full bg-[#ccc]"></div>
      {/* map */}
      <div>
        <div className="mb-[32px] flex justify-between">
          <div className="flex text-[20px] font-[640]">
            <div>Location/Map</div>
            <div className="ml-[15px] flex items-center text-[16px]">
              <span className="mr-[5px]">
                <FaLocationDot />
              </span>
              {locationDisplay.address}
            </div>
          </div>
          <div className="rounded bg-[#FF7757] px-[16px] py-[8px] text-white hover:opacity-70">
            View on google maps
          </div>
        </div>
        <div>
          <Map />
        </div>
      </div>

      <div className="mb-[64px] mt-[-100px] h-[1px] w-full bg-[#ccc]"></div>
      {/* review */}
      <div className="mb-[32px] flex justify-between">
        <div className="flex text-[20px] font-[640]">
          <div>Reviews</div>
        </div>
        <div className="rounded bg-[#FF7757] px-[16px] py-[8px] text-white hover:opacity-70">
          Give your review
        </div>
      </div>
      <div className="flex">
        <div className="mr-[8px] text-[50px] font-bold">4.2</div>
        <div className="flex flex-col justify-around py-[12px]">
          <div className="text-[20px] font-[600]">Very good</div>
          <div className="text-[14px] font-[400]">371 verified reviews</div>
        </div>
      </div>
      <div className="my-[24px] h-[1px] w-full bg-[#ccc]"></div>
    </div>
  );
};

export default LocationDetail;
