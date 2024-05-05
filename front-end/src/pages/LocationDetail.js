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

const LocationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.user.id);
  const activeStatus = useSelector((state) => state.tripCreate.active);
  const day = useSelector((state) => state.tripCreate.day);

  const [loginRequiredActive, setLoginRequiredActive] = useState(false);
  const [scrollTopButtonActive, setScrollTopButton] = useState(false);
  const [choicesActive, setChoicesActive] = useState(false);

  const activeLoginRequired = () => {
    setLoginRequiredActive((prev) => !prev);
  };

  const handleActiveChoices = () => {
    setChoicesActive((prev) => !prev);
  };

  const { filterby } = useParams();
  const locationDetail = useSelector((state) => state.location.locationList);

  const locationDisplay = locationDetail.filter(
    (location) => location.id === parseInt(filterby),
  )[0];

  console.log("location");
  console.log(locationDisplay);

  const total =
    locationDisplay.positive +
    locationDisplay.negative +
    locationDisplay.neutral;

  //Category
  const hotelCategory = locationDetail.filter(
    (location) => location.category.name === "Hotel",
  );
  const hotel_id = hotelCategory.map((item) => item.id);
  const restaurantCategory = locationDetail.filter(
    (location) => location.category.name === "Restaurant",
  );
  const restaurant_id = restaurantCategory.map((item) => item.id);

  const pieDataSet = [
    ((locationDisplay.positive / total) * 100).toFixed(2),
    ((locationDisplay.negative / total) * 100).toFixed(2),
    ((locationDisplay.neutral / total) * 100).toFixed(2),
  ];

  const barDataSet = [
    locationDisplay.convenient,
    locationDisplay.service,
    locationDisplay.yummy && locationDisplay.yummy,
  ];

  const barLabels = ["Convenient", "Service", locationDisplay.yummy && "Yummy"];

  const compareBarLables =
    locationDisplay.category.name === "Hotel"
      ? hotelCategory.map((item) => item.name)
      : restaurantCategory.map((item) => item.name);

  // Compare to other location
  const tags = ["Positive", "Convenient", "Service", "Yummy"];
  if (locationDisplay.category.name === "Hotel") {
    tags.pop();
  }
  const [compareLabel, setCompareLabel] = useState("Positive");
  const positiveCompare =
    locationDisplay.category.name === "Hotel"
      ? hotelCategory.map((item) =>
          (
            (item.positive / (item.positive + item.negative + item.neutral)) *
            100
          ).toFixed(2),
        )
      : restaurantCategory.map((item) =>
          (
            (item.positive / (item.positive + item.negative + item.neutral)) *
            100
          ).toFixed(2),
        );
  const positivePoint = ((locationDisplay.positive / total) * 100).toFixed(2);
  const [compareBarDataSet, setCompareBarDataSet] = useState([
    ...positiveCompare,
  ]);
  const [comparePoint, setComparePoint] = useState(positivePoint);
  const sortedPositivePoint =
    locationDisplay.category.name === "Hotel"
      ? hotelCategory
          .map((item) =>
            (
              (item.positive / (item.positive + item.negative + item.neutral)) *
              100
            ).toFixed(2),
          )
          .sort((a, b) => b - a)
      : restaurantCategory
          .map((item) =>
            (
              (item.positive / (item.positive + item.negative + item.neutral)) *
              100
            ).toFixed(2),
          )
          .sort((a, b) => b - a);
  const ranking = sortedPositivePoint.findIndex(
    (value) => value === positivePoint,
  );
  const [rank, setRank] = useState(ranking);

  const handleSetCompareLabel = async (label) => {
    setCompareLabel(label);
    setChoicesActive((prev) => !prev);
  };

  useEffect(() => {
    if (compareLabel === "Service") {
      //Service points
      const serviceCompare =
        locationDisplay.category.name === "Hotel"
          ? hotelCategory.map((item) =>
              ((item.service / item.positive) * 100).toFixed(2),
            )
          : restaurantCategory.map((item) =>
              ((item.service / item.positive) * 100).toFixed(2),
            );
      const servicePoint = (
        (locationDisplay.service / locationDisplay.positive) *
        100
      ).toFixed(2);
      //Ranking point
      const sortedServicePoint =
        locationDisplay.category.name === "Hotel"
          ? hotelCategory
              .map((item) => ((item.service / item.positive) * 100).toFixed(2))
              .sort((a, b) => b - a)
          : restaurantCategory
              .map((item) => ((item.service / item.positive) * 100).toFixed(2))
              .sort((a, b) => b - a);
      const rank = sortedServicePoint.findIndex(
        (value) => value === servicePoint,
      );
      setComparePoint(servicePoint);
      setRank(rank);
      setCompareBarDataSet([...serviceCompare]);
    }
    //convenient points
    else if (compareLabel === "Convenient") {
      const convenientCompare =
        locationDisplay.category.name === "Hotel"
          ? hotelCategory.map((item) =>
              ((item.convenient / item.positive) * 100).toFixed(2),
            )
          : restaurantCategory.map((item) =>
              ((item.convenient / item.positive) * 100).toFixed(2),
            );
      const convenientPoint = (
        (locationDisplay.convenient / locationDisplay.positive) *
        100
      ).toFixed(2);
      //Ranking point
      const sortedConvenientPoint =
        locationDisplay.category.name === "Hotel"
          ? hotelCategory
              .map((item) =>
                ((item.convenient / item.positive) * 100).toFixed(2),
              )
              .sort((a, b) => b - a)
          : restaurantCategory
              .map((item) =>
                ((item.convenient / item.positive) * 100).toFixed(2),
              )
              .sort((a, b) => b - a);
      const rank = sortedConvenientPoint.findIndex(
        (value) => value === convenientPoint,
      );
      setComparePoint(convenientPoint);
      setRank(rank);
      setCompareBarDataSet([...convenientCompare]);
    }
    //yummy points
    else if (compareLabel === "Yummy") {
      const yummyCompare = restaurantCategory.map((item) =>
        ((item.yummy / item.positive) * 100).toFixed(2),
      );
      const yummyPoint = (
        (locationDisplay.yummy / locationDisplay.positive) *
        100
      ).toFixed(2);
      //Ranking point
      const sortedYummyPoint = restaurantCategory
        .map((item) => ((item.yummy / item.positive) * 100).toFixed(2))
        .sort((a, b) => b - a);
      const rank = sortedYummyPoint.findIndex((value) => value === yummyPoint);
      setComparePoint(yummyPoint);
      setRank(rank);
      setCompareBarDataSet([...yummyCompare]);
    }
    //positive points
    else if (compareLabel === "Positive") {
      setCompareBarDataSet([...positiveCompare]);
      setComparePoint(positivePoint);
      setRank(ranking);
    }
  }, [compareLabel, comparePoint, positivePoint, ranking]);

  //
  const airportDistanceDataSet = hotelCategory.map(
    (item) => item.airport_distance,
  );

  const sortedAirportDistance = hotelCategory
    .map((item) => item.airport_distance)
    .sort((a, b) => a - b);
  const airportDistanceRank = sortedAirportDistance.findIndex(
    (value) => value === locationDisplay.airport_distance,
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 800) {
        setScrollTopButton(true);
      } else {
        setScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handelAddData = () => {
    const newData = {
      id: locationDisplay.id,
      name: locationDisplay.name,
      address: locationDisplay.address,
      url: locationDisplay.url,
      latitude: locationDisplay.latitude,
      longitude: locationDisplay.longitude,
      category: locationDisplay.category.name,
      day: day,
    };
    dispatch(setLocationItem(newData));
    dispatch(getLocationArray(day));
    navigate("/tripcreate");
  };

  const pieData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: pieDataSet,
        backgroundColor: [
          "rgb(238, 108, 77, 1)",
          "rgb(23, 161, 205, 1)",
          "rgba(255, 191, 0, 1)",
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
        ],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        display: true,
      },
    },
  };

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: locationDisplay.name,
        data: barDataSet,
        backgroundColor: "rgb(238, 108, 77, 1)",
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: locationDisplay.positive,
      },
    },
  };

  const compareBarData = {
    labels: compareBarLables,
    datasets: [
      {
        label: compareLabel,
        data: compareBarDataSet,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        hoverBackgroundColor: "#EC932F",
      },
    ],
  };

  const compareBarOptions = {
    plugins: {
      datalabels: {
        display: true,
        color: "#36A2EB",
        align: "end",
        anchor: "end",
        font: { size: "8" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    onclick: function (event, elements) {
      if (elements.length > 0) {
        const barIndex = elements[0]._index;
        console.log("Clicked on bar", barIndex);
      }
    },
  };

  const airportDistanceBarData = {
    labels: compareBarLables,
    datasets: [
      {
        label: "airport distance",
        data: airportDistanceDataSet,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        hoverBackgroundColor: "#EC932F",
      },
    ],
  };

  const airportDistanceBarOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <div className="mx-8 mt-8 px-[104px]">
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
    </div>
  );
};

export default LocationDetail;
