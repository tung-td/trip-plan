import React from "react";
import { useNavigate } from "react-router-dom";

import icons_banner from "../../assets/HomeImg/icons_banner.png";

const HeroSection = (props) => {
  const user_id = props.user_id;
  const navigate = useNavigate();

  const active = () => {
    if (user_id) return props.activeTripInitial();
    return props.activeLoginRequired();
  };

  const isLoggedIn = () => {
    return !!user_id;
  };

  return (
    <section className="flex h-[100%] flex-col items-center justify-center text-center sm:h-[835px]">
      <div className="mb-[16px] text-center font-poppins text-[3rem] font-semibold leading-10 text-white md:text-[80px]">
        Travel with us
      </div>
      <div className="mb-[64px] font-poppins text-[1rem] font-light text-white md:w-[693px] md:text-[30px]">
        Get a personalized itinerary just for you, guided by traveler tips and
        reviews.
      </div>

      {isLoggedIn() ? (
        <button
          onClick={() => active()}
          className="flex w-[353px] items-center justify-center rounded-[40px] bg-black p-[14.5px] text-center font-poppins text-lg font-medium text-white"
        >
          Start your trip now
        </button>
      ) : (
        <button
          onClick={() => navigate("login")}
          className="flex w-[353px] items-center justify-center rounded-[40px] bg-black p-[14.5px] text-center font-poppins text-lg font-medium text-white"
        >
          Sign up
        </button>
      )}

      <div className="absolute bottom-[6rem] hidden md:block">
        <img src={`${icons_banner}`} />
      </div>
    </section>
  );
};

export default HeroSection;
