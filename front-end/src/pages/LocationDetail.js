import React, { useEffect, useState } from "react";
import "chartjs-plugin-datalabels";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FaStar, FaLeaf, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import { CiAirportSign1 } from "react-icons/ci";
import {
  RiCustomerService2Line,
  RiServiceLine,
  RiCupFill,
} from "react-icons/ri";
import { IoIosFitness, IoMdShare } from "react-icons/io";
import { IoWine, IoFlag, IoHappyOutline } from "react-icons/io5";
import {
  MdOutlineRoomService,
  MdOutlinePool,
  MdOutlineRestaurant,
} from "react-icons/md";
import Map from "../components/Trip_Create_Component/TripCreateCard/Map";
import avatar from "../assets/img/avt.jpg";
import Footer from "../components/Home_Components/Footer";

import ReviewForm from "../components/Location_Detail_Component/ReviewForm";

const LocationDetail = () => {
  const API = process.env.REACT_APP_SERVER_DOMAIN;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.user.id);
  const activeStatus = useSelector((state) => state.tripCreate.active);
  const day = useSelector((state) => state.tripCreate.day);
  const [allReview, setAllReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { filterby } = useParams();
  const locationDetail = useSelector((state) => state.location.locationList);

  const locationDisplay = locationDetail.filter(
    (location) => location.id === parseInt(filterby),
  )[0];
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Định dạng ngày thành YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    fetch(`${API}comment/location/${parseInt(filterby)}`)
      .then((response) => response.json())
      .then((result) => {
        setAllReview(result.data);
        console.log("tesst", result.data);
      })
      .catch((error) => console.error(error));
  }, [filterby]);

  const handleReviewSubmit = (review) => {
    const raw = JSON.stringify({
      user_id: review.userID,
      location_id: review.locationID,
      rating: review.ratingRV,
      text: review.text,
      date: review.date,
    });

    fetch(`${API}comment/createcomment/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken":
          "Ue2Ic3ErTRiN2MzcjXdhVpO8AVx4XDfCPcMgVz87WRfvHAge2wsx7Wa5uw7ZXJ3g",
      },
      body: raw,
    })
      .then((response) => response.json())
      .then((result) => {
        // Update review list if necessary
        setAllReview((prevReviews) => [...prevReviews, result.data]);
        // Navigate to the current page to force reload
        navigate(0);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit review"); // Optionally alert the user
      });
  };

  const stars = (reviewId) => {
    const star = [];
    const review = allReview.find((r) => r.id === reviewId);

    if (review) {
      const rating = review.rating;

      if (!rating || rating <= 0) {
        for (let i = 0; i < 5; i++) {
          star.push(<FaRegStar className="mr-[2px] text-[#FF7757]" key={i} />);
        }
        return star;
      }

      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
        star.push(<FaStar className="mr-[2px] text-[#FF7757]" key={i} />);
      }

      if (hasHalfStar) {
        star.push(
          <FaStarHalfAlt
            className="mr-[2px] text-[#FF7757]"
            key={star.length}
          />,
        );
        fullStars++;
      }
      for (let i = fullStars; i < 5; i++) {
        star.push(<FaRegStar className="mr-[2px] text-[#FF7757]" key={i} />);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        star.push(<FaRegStar className="mr-[2px] text-[#FF7757]" key={i} />);
      }
    }

    return star;
  };

  return (
    <div className="">
      <div className="mt-8 px-4 sm:mx-5 sm:px-2 md:mx-4 md:px-3 lg:mx-8 lg:px-8">
        {/* Title */}
        <div className="justify-between md:flex lg:flex">
          {/* Title : Left Conent */}
          <div className="">
            <div className="grid items-center sm:flex">
              <h1 className="mr-[20px] text-5xl font-semibold sm:text-3xl md:text-4xl">
                {locationDisplay.name}
              </h1>
              <span className="flex items-center sm:text-[12px]">
                <FaStar className="text-[#FF7757]" />
                <FaStar className="text-[#FF7757]" />
                <FaStar className="text-[#FF7757]" />
                <FaStar className="text-[#FF7757]" />
                <FaStar className="text-[#FF7757]" />
                <span className="ml-2">5 Star Hotel</span>
              </span>
            </div>

            <div className="mt-[15px] flex items-center sm:text-[14px]">
              <span className="mr-[5px]">
                <FaLocationDot />
              </span>
              {locationDisplay.address}
            </div>

            <div className="mb-3 mt-[10px] flex items-center sm:mb-0 sm:text-[14px]">
              <div className="rounded border p-[5px] px-[10px]">4.2</div>
              <p className="mb-0 ml-[10px]">
                <span className="mr-3 font-bold">Very Good</span> 371 reviews
              </p>
            </div>
          </div>
          {/* Title : Left Conent */}

          {/* Title : Right Conent */}
          <div className="flex flex-wrap justify-between sm:flex-row md:flex-col">
            <div className="text-right text-[32px] font-bold text-[#FF7757]">
              $240<span className="text-[16px]">/night</span>
            </div>
            <div className="mt-4 flex sm:mt-0">
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
          {/* Title : Right Conent */}
        </div>

        {/* IMG */}
        <div className="mt-8 grid h-auto grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
          <div className="cursor-pointer" dir="ltr">
            <img
              className="h-full w-full rounded-lg object-cover"
              src={locationDisplay.image}
              alt={locationDisplay.image}
            />
          </div>
          <div className="grid h-full cursor-pointer grid-cols-2 gap-2">
            <img
              className="h-56 w-full rounded-lg object-cover lg:h-auto"
              src={locationDisplay.image}
              alt={locationDisplay.image}
            />
            <img
              className="h-56 w-full rounded-lg object-cover lg:h-auto"
              src={locationDisplay.image}
              alt={locationDisplay.image}
            />
            <img
              className="hidden h-56 w-full rounded-lg object-cover sm:block lg:h-auto"
              src={locationDisplay.image}
              alt={locationDisplay.image}
            />
            <img
              className="hidden h-56 w-full rounded-lg object-cover sm:block lg:h-auto"
              src={locationDisplay.image}
              alt={locationDisplay.image}
            />
          </div>
          <button className="col-span-1 mt-4 rounded bg-[#FF7757] px-4 py-2 text-white hover:opacity-70 lg:col-span-2">
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
        <div className="mt-[32px] flex w-full flex-1 flex-wrap gap-y-3">
          <div className="mr-[16px] flex h-[145px] w-full flex-col justify-between rounded bg-[#FF7757] p-[16px] pr-[64px] font-[500] sm:w-[166px]">
            <div className="text-[32px] font-bold">4.2</div>
            <div>
              Very good <p>371 reviews</p>
            </div>
          </div>
          <div className="border-1 mr-[16px] flex h-[145px] w-full flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500] sm:w-[166px]">
            <div>
              <CiAirportSign1 className="text-[32px] font-bold" />
            </div>
            <div>{locationDisplay.airport_distance} km to airport</div>
          </div>
          <div className="border-1 mr-[16px] flex h-[145px] w-full flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500] sm:w-[166px]">
            <div>
              <IoHappyOutline className="text-[32px] font-bold" />
            </div>
            <div>{locationDisplay.positive} positive</div>
          </div>
          <div className="border-1 mr-[16px] flex h-[145px] w-full flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500] sm:w-[166px]">
            <div>
              <RiCustomerService2Line className="text-[32px] font-bold" />
            </div>
            <div>{locationDisplay.convenient} convenient</div>
          </div>
          <div className="border-1 mr-[16px] flex h-[145px] w-full flex-col justify-between rounded border-[#FF7757] p-[16px] pr-[64px] font-[500] sm:w-[166px]">
            <div>
              <RiServiceLine className="text-[32px] font-bold" />
            </div>
            <div>{locationDisplay.service} service</div>
          </div>
        </div>

        <div className="my-[64px] h-[1px] w-full bg-[#ccc]"></div>
        {/* Amenities */}
        <div className="mb-[32px] text-[20px] font-[640]">Amenities</div>

        <div className=" sm:full w-full flex-row justify-between sm:flex  md:w-1/2">
          <div className="flex flex-col">
            <div className="flex font-[500]">
              <FaLeaf className="mb-[24px] mr-[5px] text-3xl sm:text-[20px]" />
              Spa and wellness center
            </div>
            <div className="flex font-[500]">
              <IoIosFitness className="mb-[24px] mr-[5px] text-3xl sm:text-[20px]" />
              Fitness center
            </div>
            <div className="flex font-[500]">
              <RiCupFill className="mb-[24px] mr-[5px] text-3xl sm:text-[20px]" />
              Tea/coffee machine
            </div>
            <div className="flex font-[500]">
              <IoWine className="mb-[24px] mr-[5px] text-3xl sm:text-[20px]" />
              Bar/Lounge
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex font-[500]">
              <MdOutlineRoomService className="mb-[24px] mr-[5px] text-3xl sm:text-[20px]" />
              Room service
            </div>
            <div className="flex font-[500]">
              <MdOutlinePool className="mb-[24px] mr-[5px] text-3xl sm:text-[20px]" />
              Outdoor pool
            </div>
            <div className="flex font-[500]">
              <MdOutlineRestaurant className="mb-[24px] mr-[5px] text-3xl sm:text-[20px]" />
              Restaurant
            </div>
            <div className="flex font-[500] text-[#FF7757]">+24 more</div>
          </div>
        </div>

        <div className="my-[46px] h-[1px] w-full bg-[#ccc]"></div>

        {/* map */}
        <div>
          <div className="mb-[32px] flex flex-wrap justify-between">
            <div className="flex flex-wrap text-[20px] font-[640]">
              <div className="w-full self-center sm:block">Location/Map</div>
              <div className="mt-0sm:ml-[15px] flex items-center text-[16px]">
                <span className="mr-3 sm:mr-[5px]">
                  <FaLocationDot />
                </span>
                {locationDisplay.address}
              </div>
            </div>

            <div className="my-3 sm:my-0">
              <a
                className="rounded bg-[#FF7757] px-[16px] py-[8px] text-white hover:opacity-70"
                href="https://www.google.com/maps"
                target="_blank"
              >
                View on google maps
              </a>
            </div>
          </div>

          <div className="mb-[168px]">
            <Map />
          </div>
        </div>

        <div className="mb-[64px] mt-[-100px] h-[1px] w-full bg-[#ccc]"></div>

        {/* review */}
        <div className="mb-[32px] flex justify-between">
          <div className="flex text-[20px] font-[640]">
            <div>Reviews</div>
          </div>
          <button
            className="rounded bg-[#FF7757] px-[20px] py-[8px] text-white hover:opacity-70"
            onClick={() => setShowReviewForm(true)}
          >
            Give your review
          </button>
        </div>
        <div className="flex">
          <div className="mr-[8px] text-[50px] font-bold">4.2</div>
          <div className="flex flex-col justify-around py-[12px]">
            <div className="text-[20px] font-[600]">Very good</div>
            <div className="text-[14px] font-[400]">371 verified reviews</div>
          </div>
        </div>

        {/* Show Review */}
        {allReview.map((review) => (
          <div key={review.id} className=" relative">
            <div className="my-[24px] h-[1px] w-full bg-[#ccc]"></div>
            <div className="flex">
              <img
                src={avatar}
                alt={avatar}
                className="mr-[16px] h-[45px] w-[45px] rounded-full"
              />
              <div className="flex flex-col">
                <div className="mb-[8px] flex">
                  <div className="flex items-center text-[17px] font-[600]">
                    {stars(review.id - 1)}
                  </div>
                  <div className="mx-[8px] text-[14px] font-[400]">|</div>
                  <div className="text-[14px] font-[400] capitalize">
                    {review.user_name}
                  </div>
                </div>
                <div className="text-[14px] font-[400]">{review.text}</div>
              </div>
            </div>
            <IoFlag className="absolute right-0 top-[50%] cursor-pointer hover:opacity-70" />
          </div>
        ))}
        <div className="my-[24px] mb-[60px] h-[1px] w-full bg-[#ccc]"></div>
        {/* Show form submit review */}
        {showReviewForm && (
          <ReviewForm
            onSubmit={handleReviewSubmit}
            onClose={() => setShowReviewForm(false)}
            userID={user_id}
            day={currentDate} // Truyền ngày hiện tại như là một prop
            locationID={parseInt(filterby)}
          />
        )}
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default LocationDetail;
