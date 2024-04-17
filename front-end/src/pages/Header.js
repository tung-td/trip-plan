import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/img/Logo.png";
import avt from "../assets/img/avt.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";
import {
  FaBed,
  FaPlane,
  FaHeart,
  FaUser,
  FaWallet,
  FaChevronRight,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast.success("Logout successfully");
  };

  const userData = useSelector((state) => state.user);

  const handleClickOutside = (event) => {
    if (showMenu && ref.current && !ref.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <header>
      <nav className="h-[87px] w-full bg-white px-[166px]">
        <div
          className="mx-auto flex h-[87px] w-full items-center justify-between"
          ref={ref}
        >
          <div className="flex w-1/3 items-center font-semibold">
            <NavLink
              to="/"
              className={`mr-[32px] flex bg-transparent font-bold text-black ${activeLink === "/" ? "active-link" : ""} flex items-center leading-[84px]`}
              onClick={() => handleNavLinkClick("/")}
            >
              <FaBed className="mr-[10px] text-[19px]" /> Finds Stays
            </NavLink>
            <NavLink
              to="/tripcreate"
              className={`mr-[32px] flex bg-transparent font-bold text-black ${activeLink === "/mytrip" ? "active-link" : ""} flex items-center leading-[84px]`}
              onClick={() => handleNavLinkClick("/mytrip")}
            >
              <FaPlane className="mr-[10px] text-[19px]" /> My Trips
            </NavLink>
          </div>

          <NavLink to="/" className="flex w-1/3 justify-center">
            {/* Ảnh Logo Trip Advisor */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="Trip Advisor Logo"
                className="h-5 h-8 w-5 w-8 text-[20px]"
              />
              {/* <SiTripadvisor className="text-5xl" /> */}
              <span className="text-2xl text-xl font-bold">Travel Advisor</span>
            </div>
          </NavLink>

          <div className="flex w-1/3 items-center justify-end">
            <div className="flex items-center text-[16px] font-bold">
              <FaHeart className="mr-[5px]" /> Favourites
            </div>
            <div className="ml-[16px] mr-[30px] text-[16px] font-bold">|</div>
            {userData.email ? (
              <div
                className="relative flex cursor-pointer items-center"
                onClick={handleShowMenu}
              >
                <img
                  src={avt}
                  alt="avt"
                  className="h-[45px] w-[45px] rounded-full"
                />
                <span className="ml-[5px] text-[16px] font-bold capitalize">
                  {userData.user}
                </span>
                {showMenu && (
                  <div className="absolute right-[30px] top-[50px] z-50 flex w-[329px] flex-col rounded-[8px] bg-white p-[32px] shadow-lg">
                    <ul className=" w-full text-base font-normal ">
                      <div className="relative flex cursor-pointer items-center">
                        <img
                          src={avt}
                          alt="avt"
                          className="mr-[16px] h-[64px] w-[64px] rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="ml-[5px] text-[16px] font-bold capitalize">
                            {userData.user}
                          </p>
                          <div className="ml-[7px] flex items-center">
                            <div className="h-[10px] w-[10px] rounded-full bg-green-500">
                              .
                            </div>
                            <p className="ml-[5px] text-[16px] capitalize">
                              Online
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="my-[24px] h-[0.5px] w-full bg-[#666] opacity-25"></div>

                      <NavLink
                        className="flex justify-between"
                        to="userprofile"
                      >
                        <li className="mb-[16px] flex items-center">
                          <FaUser className="mr-[8px] h-[18px] w-[18px]" /> My
                          account
                        </li>
                        <FaChevronRight />
                      </NavLink>
                      <NavLink className="flex justify-between" to="/">
                        <li className="mb-[16px] flex items-center">
                          <FaWallet className="mr-[8px] h-[18px] w-[18px]" />{" "}
                          Payment
                        </li>
                        <FaChevronRight />
                      </NavLink>
                      <NavLink className="flex justify-between" to="/">
                        <li className="mb-[16px] flex items-center">
                          <FaGear className="mr-[8px] h-[18px] w-[18px]" />{" "}
                          Settings
                        </li>
                        <FaChevronRight />
                      </NavLink>

                      <div className="my-[24px] h-[0.5px] w-full bg-[#666] opacity-25"></div>

                      <NavLink className="flex justify-between" to="/">
                        <li className="mb-[16px] flex items-center">
                          <MdOutlineSupportAgent className="mr-[8px] h-[23px] w-[23px]" />{" "}
                          Support
                        </li>
                        <FaChevronRight />
                      </NavLink>

                      <li
                        className="flex items-center hover:text-red-600"
                        onClick={handleLogout}
                      >
                        <IoLogOut className="mr-[8px] h-[23px] w-[23px]" />
                        Log out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <NavLink to="login">
                  <button className="mr-[10px] flex items-center rounded-[8px] border border-solid border-[#000] px-[23px] py-[6px] text-lg hover:opacity-70">
                    Log in
                  </button>
                </NavLink>
                <NavLink to="signup">
                  <button className="mr-[10px] flex items-center rounded-[8px] border border-solid border-[#000] bg-black px-[23px] py-[6px] text-lg text-white hover:opacity-70">
                    Sign up
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          {/* ##### GIAO DIỆN MOBILE Ở ĐÂY ##### */}
          {/* <div className="flex items-center ">
            <button onClick={toggleMobileMenu}>
              <GiHamburgerMenu className="text-2xl" />
            </button>
          </div> */}
        </div>

        {/* Mobile Menu */}
        {/* {isMobileMenuOpen && (
          <div className="mt-3 flex flex-col space-y-2 ">
            <button className="rounded-md border-l-4 border-slate-200 p-2 text-left font-semibold duration-100 ease-in-out hover:bg-slate-200 hover:shadow-md hover:transition">
              <NavLink to="login">Login</NavLink>
            </button>
            <button className="rounded-md border-l-4 border-slate-200 p-2 text-left font-semibold duration-100 ease-in-out hover:bg-slate-200 hover:shadow-md hover:transition">
              <NavLink to="signup">Sign Up</NavLink>
            </button>
          </div>
        )} */}
      </nav>
    </header>
  );
};

export default Header;
