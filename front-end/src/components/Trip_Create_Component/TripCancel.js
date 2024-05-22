import React from "react";
import { useNavigate } from "react-router-dom";

const TripCancel = (props) => {
  const navigate = useNavigate();

  const exit = () => {
    navigate("/");
  };
  return (
    <div className="fixed inset-0 z-50 ">
      {/* Overlay */}
      <div class="absolute inset-0 bg-black opacity-40"></div>
      {/* Main contain */}
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 flex w-1/4 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-xl bg-white py-4">
          <h1 className=" mx-8 text-2xl font-bold text-slate-900 ">
            Do you want to exit?
          </h1>
          <h2 className="mx-8 text-lg font-semibold  text-slate-900">
            This change may not be saved!
          </h2>
          <div className="flex w-full items-center justify-around">
            <button
              onClick={props.active}
              className="mt-5  rounded-lg border border-slate-700 px-10 py-2 text-base font-bold text-slate-800 hover:bg-slate-900 hover:text-white"
            >
              No
            </button>
            <button
              onClick={exit}
              className="mt-5  rounded-lg border border-slate-700 px-10 py-2 text-base font-bold text-slate-800 hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCancel;
