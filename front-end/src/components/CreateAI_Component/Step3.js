import React, { useState } from "react";

const Step3 = ({ onTravelersChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    onTravelersChange(option);
    setSelectedOption(option);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full justify-center p-[35px] text-[28px] font-bold">
        Who are you traveling with?
      </div>

      {/* Hiển thị các lựa chọn dưới dạng cards */}
      <div className="flex items-center">
        <div
          className={`mx-2 cursor-pointer rounded-md border-2 p-4 ${
            selectedOption === "Solo" && "border-black"
          }`}
          onClick={() => handleOptionChange("Solo")}
        >
          Solo
        </div>

        <div
          className={`mx-2 cursor-pointer rounded-md border-2 p-4 ${
            selectedOption === "Partner" && "border-black"
          }`}
          onClick={() => handleOptionChange("Partner")}
        >
          Partner
        </div>

        <div
          className={`mx-2 cursor-pointer rounded-md border-2 p-4 ${
            selectedOption === "Friends" && "border-black"
          }`}
          onClick={() => handleOptionChange("Friends")}
        >
          Friends
        </div>

        <div
          className={`mx-2 cursor-pointer rounded-md border-2 p-4 ${
            selectedOption === "Family" && "border-black"
          }`}
          onClick={() => handleOptionChange("Family")}
        >
          Family
        </div>
      </div>
    </div>
  );
};

export default Step3;
