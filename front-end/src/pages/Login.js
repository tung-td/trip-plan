import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import banner1 from "../assets/Auth/login_banner_1.png";
import { FaGoogle, FaApple, FaLongArrowAltLeft } from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state);
  const API = process.env.REACT_APP_SERVER_DOMAIN;
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleOnchange = (e) => {
    e.preventDefault();
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
    const { username, password } = data;
    if (username && password) {
      const fetchData = await fetch(`${API}/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataRes = await fetchData.json();

      if (dataRes.message) {
        toast.success(dataRes.message);
        console.log("DATA CUA USER SAU KHI LOGIN LÀ :", userData)
        toast(`Welcome back! ${dataRes.user.username}`, {
          icon: "👏",
          style: {
            borderRadius: "10px",
          },
        });
        dispatch(loginRedux(dataRes));
        localStorage.setItem("accessToken", dataRes.token.access);
        navigate("/");
      } else if (dataRes.error) toast.error(dataRes.error);
    } else {
      toast.error("Please enter require field");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
          <div className="h-[142px] w-[142px] rounded-full bg-[#D9D9D9]"></div>
          <div className="flex w-full flex-col">
            <h1 className="mt-[40px] font-poppins text-[74px] font-bold text-black">
              Travel with us
            </h1>
            <p className="mt-[-23px] text-[36px] font-light text-black">
              Join us today
            </p>
          </div>
          <form
            className="mt-[30px] flex w-full flex-col py-3"
            onSubmit={handleSubmit}
          >
            {/* User name */}
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleOnchange}
              placeholder="Enter your Username ..."
              className="mb-5 mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
            />
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnchange}
                placeholder="Enter your Password ..."
                className="mb-5 mt-1 h-[59px] w-full rounded-[48px] border border-slate-300 px-[36px] py-[18px] focus-within:outline-blue-300"
              />
              <span
                className="absolute right-[35px] top-[22px] flex cursor-pointer text-[25px]"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button
              type="submit"
              className="mt-[40px] h-[59px] w-full cursor-pointer rounded-[48px] bg-black text-center text-[24px] font-[700] text-white hover:opacity-[70%]"
            >
              Login
            </button>
          </form>
          <div className="mb-[20px] flex w-1/3 items-center">
            <div className="h-[2px] w-full bg-[#666666] opacity-[0.25]"></div>
            <div className="px-[11px] text-[#666]">OR</div>
            <div className="h-[2px] w-full bg-[#666666] opacity-[0.25]"></div>
          </div>

          <div className="flex w-full">
            <button className="mx-[23px] flex h-[48px] w-1/2 items-center justify-center rounded-[48px] border px-[51px] py-[10px] hover:bg-[#ccc] hover:text-white">
              <FaGoogle className="mr-[11px] text-[24px]" /> Login with Google
            </button>
            <button className="mx-[23px] flex h-[48px] w-1/2 items-center justify-center rounded-[48px] border px-[51px] py-[10px] hover:bg-[#ccc] hover:text-white">
              <FaApple className="mr-[11px] text-[24px]" />
              Login with Google
            </button>
          </div>

          <p className="text-light mt-[20px] text-left text-[#333]">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-lg font-bold text-[#4A9DFF]">
              Signup now
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full justify-around bg-white py-[18px] text-[#666]">
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
