import React from "react";
import earth from "../../assets/img/earth.png";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMailchimp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#172432] px-[182px] pb-[30px] pt-[135px] text-white">
      <div className="flex items-center justify-around pb-20">
        {/* Item 1 */}
        <div className="ml-20 flex flex-col">
          <div className="flex">
            <img src={earth} alt="earth" className=" h-[50px] w-[50px]" />
            <h1 className=" flex items-center text-2xl font-semibold">
              Trip Advisor
            </h1>
          </div>
          <div className="mt-[10px]">
            <p className="text-[14px] text-white">
              Copyright © Travellian 2020 All rights reserved
            </p>
          </div>
        </div>
        {/* Item 2 */}
        <div className="mr-20 flex flex-1 justify-around">
          <div className="flex flex-col">
            <h2 className="mb-[15px] text-2xl font-semibold">Company</h2>
            <span className=" text-lg font-normal text-slate-500">Home</span>
            <span className=" text-lg font-normal text-slate-500">Explore</span>
            <span className=" text-lg font-normal text-slate-500">Travel</span>
            <span className=" text-lg font-normal text-slate-500">Blog</span>
          </div>
          <div className="flex flex-col">
            <h2 className="mb-[15px] text-2xl font-semibold">Information</h2>
            <span className=" text-lg font-normal text-slate-500">
              Destinations
            </span>
            <span className=" text-lg font-normal text-slate-500">
              Supports
            </span>
            <span className=" text-lg font-normal text-slate-500">
              Terms & Conditions
            </span>
            <span className=" text-lg font-normal text-slate-500">Privacy</span>
          </div>
          <div className="flex flex-col">
            <h2 className="mb-[15px] text-2xl font-semibold">Contact Info</h2>
            <span className=" text-lg font-normal text-slate-500">
              +123 456 789
            </span>
            <span className=" text-lg font-normal text-slate-500">
              info@capstone2.com
            </span>
            <span className=" text-lg font-normal text-slate-500">
              Da Nang, Viet Nam
            </span>
            <span className=" text-lg font-normal text-slate-500">
              About us
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className=" text-2xl font-semibold">Follow us on</h2>
            <span className="mt-[15px] flex text-lg font-normal">
              <FaFacebook className="mr-[15px] text-[25px]" />
              <FaInstagram className="mr-[15px] text-[25px]" />
              <FaMailchimp className="mr-[15px] text-[25px]" />
              <FaTwitter className="mr-[15px] text-[25px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
