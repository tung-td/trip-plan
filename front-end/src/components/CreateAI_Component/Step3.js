import React, { useState } from "react";

const Step3 = ({ onTravelersChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    onTravelersChange(option);
    setSelectedOption(option);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-start px-[1rem] pt-[70px] sm:px-[30rem]">
        <p className="text-[28px] font-bold">Who are you traveling with?</p>
        <p className="text-[16px] font-[400] text-[#757575]">Choose one.</p>

        {/* Hiển thị các lựa chọn dưới dạng cards */}
        <div className="flex flex-wrap items-center justify-between">
          <div
            className={`mb-[10px] h-[100px] w-[170px] cursor-pointer rounded-md border-2 p-4 ${
              selectedOption === "1 people" && "border-black"
            }`}
            onClick={() => handleOptionChange("1 people")}
          >
            Solo
          </div>

          <div
            className={`mb-[10px] h-[100px] w-[170px] cursor-pointer rounded-md border-2 p-4 ${
              selectedOption === "2 peoples" && "border-black"
            }`}
            onClick={() => handleOptionChange("2 peoples")}
          >
            Partner
          </div>

          <div
            className={`mb-[10px] h-[100px] w-[170px] cursor-pointer rounded-md border-2 p-4 ${
              selectedOption === "3 -> 8 peoples" && "border-black"
            }`}
            onClick={() => handleOptionChange("3 -> 8 peoples")}
          >
            Friends
          </div>

          <div
            className={`mb-[10px] h-[100px] w-[170px] cursor-pointer rounded-md border-2 p-4 ${
              selectedOption === "3 -> 10 peoples" && "border-black"
            }`}
            onClick={() => handleOptionChange("3 -> 10 peoples")}
          >
            Family
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
