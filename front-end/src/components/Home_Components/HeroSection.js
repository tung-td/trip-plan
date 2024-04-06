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
    <section className="flex h-[835px] flex-col items-center justify-center text-center">
      <div className="font-poppins mb-[16px] text-center text-[80px] font-semibold leading-10 text-white">
        Travel with us
      </div>
      <div className="font-poppins mb-[64px] w-[693px] text-[30px] font-light text-white">
        Get a personalized itinerary just for you, guided by traveler tips and
        reviews.
      </div>

      {isLoggedIn() ? (
        <button
          onClick={() => active()}
          className="font-poppins flex w-[353px] items-center justify-center rounded-[40px] bg-black p-[14.5px] text-center text-lg font-medium text-white"
        >
          Start your trip now
        </button>
      ) : (
        <button
          onClick={() => navigate("login")}
          className="font-poppins flex w-[353px] items-center justify-center rounded-[40px] bg-black p-[14.5px] text-center text-lg font-medium text-white"
        >
          Sign up
        </button>
      )}

      <div className="absolute bottom-[20px]">
        <img src={`${icons_banner}`} />
      </div>
    </section>
  );
};

export default HeroSection;
