import React, { useState } from "react";

import HeroSection from "../components/Home_Components/HeroSection";
import HomeCarousel from "../components/Home_Components/HomeCarousel";
import InfoSection from "../components/Home_Components/InfoSection";
import BlogSection from "../components/Home_Components/BlogSection";
import FeedBackSection from "../components/Home_Components/FeedBackSection";
import FAQSection from "../components/Home_Components/FAQSection";
import Footer from "../components/Home_Components/Footer";

import homeBanner from "../assets/HomeImg/khicau_home.png";

import TripInitalModel from "../components/Trip_Create_Component/TripInitalModel";
import LoginRequired from "../components/Home_Components/LoginRequired";

import { useSelector } from "react-redux";
import TopType from "../components/Home_Components/TopType";
import SpecialOffer from "../components/Home_Components/SpecialOffer";

export const Home = () => {
  const user_id = useSelector((state) => state.user.id);

  const [isActive, setIsActive] = useState(false);
  const [loginRequiredActive, setLoginRequiredActive] = useState(false);
  const activeTripInitial = () => {
    setIsActive((prev) => !prev);
  };

  const activeLoginRequired = () => {
    setLoginRequiredActive((prev) => !prev);
  };

  return (
    <div>
      {/* Banner */}
      <div
        className="h-[916px] w-full"
        style={{
          backgroundImage: `url(${homeBanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <HeroSection
          user_id={user_id}
          activeTripInitial={activeTripInitial}
          activeLoginRequired={activeLoginRequired}
        />
      </div>
      {/* TripCreate Initial */}
      {isActive && (
        <TripInitalModel active={activeTripInitial} user_id={user_id} />
      )}
      {loginRequiredActive && <LoginRequired active={activeLoginRequired} />}

      {/* Top Types */}
      <section className="card-type">
        <TopType />
      </section>

      {/* Carousel Section */}
      <section className="card-slider">
        <HomeCarousel />
      </section>

      {/* Info Section */}
      <section className="card-special-offer">
        <SpecialOffer />
      </section>

      {/* Blog Section */}
      <section className="blog-container">
        <BlogSection />
      </section>

      {/* FeedBack */}
      <section className="feedback-container">
        <FeedBackSection />
      </section>

      {/* FAQ Section
      <section className="faq-container">
        <FAQSection />
      </section> */}

      {/* Footer Section */}
      <section className="info-container">
        <Footer />
      </section>
    </div>
  );
};
