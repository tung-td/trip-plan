import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval } from "date-fns";

import { GrClose, GrLinkNext, GrCalendar } from "react-icons/gr";

import { toast } from "react-hot-toast";

import { setTripData } from "../../redux/tripSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const TripInitalModel = (props) => {
  const user_id = props.user_id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputStatus, setInputStatus] = useState(true);

  const [data, setData] = useState({
    name: "",
    days: "",
    user: user_id,
    items: [
      {
        day: "",
        locations: [],
      },
    ],
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get all day
  const getDates = () => {
    try {
      if (startDate && endDate) {
        const dateBetween = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });
        return dateBetween;
      }
      return [];
    } catch (err) {
      console.error(err);
    }
  };

  // Format date to "yyyy-MM-dd"
  const formatDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Set days and items in data
  useEffect(() => {
    if (startDate && endDate) {
      setData((prev) => {
        return {
          ...prev,
          items: [],
        };
      });
      getDates().map((date) => {
        setData((prev) => {
          return {
            ...prev,
            items: [
              ...prev.items,
              {
                day: formatDate(date),
                locations: [],
              },
            ],
          };
        });
      });
      setData((prev) => {
        return {
          ...prev,
          days: getDates().length,
        };
      });
    }
  }, [getDates().length]);

  const handleOnchageStartDate = (date) => {
    try {
      setStartDate(date);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnchageEndDate = (date) => {
    try {
      setEndDate(date);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setInputStatus(true);
  };

  // Submit button
  const handleCreate = (e) => {
    e.preventDefault();
    if (data.name) {
      dispatch(setTripData(data));
      toast.success("Create succesfully");
      navigate("tripcreate");
    } else {
      toast.error("Name field is required!");
      setInputStatus(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 ">
      {/* Overlay */}
      <div class="absolute inset-0 bg-black opacity-40"></div>
      {/* Main contain */}
      <div className="relative h-full w-full">
        <div className="absolute left-[12.5%] top-[26rem] w-[23.333333%]  -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white md:left-1/2 md:top-1/2 md:w-1/3">
          {/* Close */}
          <div
            className="absolute right-5 top-5 cursor-pointer rounded-full px-2 py-2 hover:bg-slate-100"
            onClick={props.active}
          >
            <GrClose />
          </div>
          {/* Title */}
          <h1 className=" mx-8 mt-10 text-3xl font-bold text-slate-900 ">
            Create a trip
          </h1>
          {/* Trip name */}
          <div className="relative mx-8 mt-5 flex flex-col">
            <span className=" text-lg font-semibold text-slate-900">
              Trip name
            </span>
            {inputStatus ? (
              <input
                placeholder="Ex: Summer trip"
                className="mt-1 w-full rounded-sm border border-slate-400 px-4 py-2"
                name="name"
                value={data.name}
                onChange={handleOnchange}
                maxLength={40}
                required
              />
            ) : (
              <input
                placeholder="Ex: Summer trip"
                className="mt-1 w-full rounded-sm border border-red-500 px-4 py-2"
                name="name"
                value={data.name}
                onChange={handleOnchange}
                maxLength={40}
                required
              />
            )}

            {data.name.length === 40 ? (
              <small className=" absolute -bottom-5 right-0 font-bold text-red-700">
                {data.name.length}/40 characters
              </small>
            ) : (
              <small className=" absolute -bottom-5 right-0">
                {data.name.length}/40 characters
              </small>
            )}
          </div>
          {/* Date */}
          <div className="mx-8 mt-5 flex items-center justify-between ">
            {/* Start day */}
            <div className="relative flex w-1/2 flex-col">
              <span className=" text-lg font-semibold text-slate-900">
                Start day
              </span>
              <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                maxDate={endDate}
                onChange={handleOnchageStartDate}
                className="mt-1 w-full rounded-sm border border-slate-400 pb-8 pl-10 pt-[10px]"
              />
              <GrCalendar className="absolute bottom-7 left-4" />
              <small className="absolute bottom-3 left-11 text-sm text-slate-500">
                {daysOfWeek[startDate.getDay()]}
              </small>
            </div>
            <div className="mx-[10px] mt-8">
              {" "}
              <GrLinkNext />{" "}
            </div>
            {/* End day */}
            <div className="relative flex w-1/2 flex-col">
              <span className=" text-lg font-semibold text-slate-900">
                End day
              </span>
              <DatePicker
                selected={endDate}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                onChange={handleOnchageEndDate}
                className="mt-1 w-full rounded-sm border border-slate-400 pb-8 pl-10 pt-[10px] "
              />
              <GrCalendar className="absolute bottom-7 left-4" />
              <small className="absolute bottom-3 left-11 text-sm text-slate-500">
                {daysOfWeek[endDate.getDay()]}
              </small>
            </div>
          </div>
          {/* Days */}
          <p className="mx-8 mt-8 text-lg font-semibold text-slate-900">
            Duration:{" "}
            <span className="text-base font-medium text-slate-900">
              {getDates().length} days
            </span>
          </p>
          {/* Button */}
          <div className="my-8 flex w-full items-end justify-end">
            <button
              onClick={handleCreate}
              className=" mx-8  rounded-xl border border-slate-400 px-4 py-2 text-lg font-semibold hover:bg-slate-800 hover:text-white"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInitalModel;
