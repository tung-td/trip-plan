import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import banner1 from "../assets/Auth/login_banner_1.png";
import { FaGoogle, FaApple, FaLongArrowAltLeft } from "react-icons/fa";

export const SignUp = () => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_SERVER_DOMAIN;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, confirmPassword } = data;
    if (first_name && last_name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(`${API}user/signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataRes = await fetchData.json();
        if (dataRes.message) toast.success(dataRes.message);
        else if (dataRes.username) toast.error(dataRes.username[0]);
        else toast.error(dataRes.error);
        if (dataRes.status) {
          navigate("/login");
        }
      } else {
        toast.error("Password does not match");
      }
    } else {
      toast.error("Please enter require field");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleConfirmShowPassword = () => {
    setConfirmPassword((prev) => !prev);
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="ml-10 mr-10 flex w-full flex-1">
        <img
          src={banner1}
          alt="Hoi An"
          className="h-screen w-1/2 object-cover"
        />
        <div className="relative ml-10 flex h-screen w-1/2 flex-1 flex-col items-center px-[140px] pt-[25px]">
          <div
            onClick={backToHome}
            className="absolute left-0 h-[50px] w-[50px] cursor-pointer text-[35px] hover:opacity-70"
          >
            <FaLongArrowAltLeft />
          </div>
          <div className="flex w-full flex-col">
            <h1 className="font-poppins text-[74px] font-bold text-black">
              Travel with us
            </h1>
            <p className="mt-[-23px] text-[36px] font-light text-black">
              Join us today
            </p>
          </div>
          <form className="flex w-full flex-col py-3" onSubmit={handleSubmit}>
            <div className="flex">
              <div className=" flex-1">
                <label className=" font-medium text-slate-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Name"
                  value={data.first_name}
                  onChange={handleOnchange}
                  className="mb-[1.5rem] mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
                />
              </div>
              <div className="ml-5 flex-1">
                <label className=" font-medium text-slate-700">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Name"
                  value={data.last_name}
                  onChange={handleOnchange}
                  className="mb-[1.5rem] mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
                />
              </div>
            </div>
            {/* User name */}
            <label className=" font-medium text-slate-700">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleOnchange}
              placeholder="User name"
              className="mb-[1.5rem] mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
            />
            {/* Email */}
            <label className=" font-medium text-slate-700">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={data.email}
              onChange={handleOnchange}
              placeholder="Email"
              className="mb-[1.5rem] mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
            />
            {/* Password */}
            <label className=" font-medium text-slate-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnchange}
                placeholder="Password"
                className="mb-[1.5rem] mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
              />
              <span
                className="absolute right-[35px] top-[22px] flex cursor-pointer text-[25px]"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            {/* Confrim password */}
            <label className=" font-medium text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnchange}
                placeholder="Password"
                className="mb-[1.5rem] mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
              />
              <span
                className="absolute right-[35px] top-[22px] flex cursor-pointer text-[25px]"
                onClick={handleConfirmShowPassword}
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button
              type="submit"
              className="mt-[20px] h-[59px] w-full cursor-pointer rounded-[48px] bg-black text-center text-[24px] font-[700] text-white hover:opacity-[70%]"
            >
              Sign Up
            </button>
          </form>
          {/* <div className='flex justify-around items-center'>
          <span className=' h-px bg-slate-900 w-72'></span> <span className=' mx-2'>or</span> <span className=' h-px bg-slate-900 w-72'></span>
        </div>
        <div className='mt-5 w-full flex justify-around'>
          <button className='border border-slate-700 hover:border-slate-900 hover:bg-slate-100 py-2 px-20 rounded-lg focus:outline-none '><FcGoogle className=' text-4xl' /></button>
          <button className='border border-slate-700 hover:border-slate-900 hover:bg-slate-100 py-2 px-20 rounded-lg focus:outline-none '><BsFacebook className=' text-4xl' /></button>
        </div> */}
          <p className="mt-2 text-left text-lg">
            Already have account ?{" "}
            <Link to={"/login"} className="text-lg text-indigo-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full justify-around bg-white py-[12px] text-[#666]">
        <p className="mx-[20px]">About</p>
        <p className="mx-[20px]">Help Center</p>
        <p className="mx-[20px]">Terms of Service</p>
        <p className="mx-[20px]">Privacy Policy</p>
        <p className="mx-[20px]">Cookie Policy</p>
        <p className="mx-[20px]">Accessibility</p>
        <p className="mx-[20px]">Careers</p>
        <p className="mx-[20px]">Marketing</p>
        <p className="mx-[20px]">Developers</p>
        <p className="mx-[20px]">Settings</p>
        <p className="mx-[20px]">@Capstone2</p>
      </div>
    </div>
  );
};
