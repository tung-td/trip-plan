import React, { useState } from "react";

const Step4 = ({ onActivitiesChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const options = [
    "Must-see Attractions",
    "Great Food",
    "Buddhist Shrines",
    "Adventure Sports",
    "Natural Wonders",
    "Night Markets",
    "History",
    "Culture",
    "Arts & Theatre",
    "Wine & Beer",
    "Outdoors",
  ];

  const handleOtherOptionChange = (event) => {
    setSelectedOptions([event.target.value]);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full justify-center p-[35px] text-[28px] font-bold">
        What activities are you interested in?
      </div>
      <div className="flex">
        {options.map((option, index) => (
          <div
            key={index}
            className={`m-2 flex cursor-pointer items-center rounded-full border p-[7px] ${
              selectedOptions.includes(option)
                ? "border-black"
                : "border-gray-300"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label htmlFor="other-option">Others:</label>
        <input
          id="other-option"
          type="text"
          className="ml-2 rounded-md border px-2 py-1"
          value={selectedOptions.length === 1 ? selectedOptions[0] : ""}
          onChange={handleOtherOptionChange}
        />
      </div>
    </div>
  );
};

export default Step4;
