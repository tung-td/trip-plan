import React, { useState, useRef, useEffect } from "react";

const Step4 = ({ activities, onActivitiesChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherOption, setOtherOption] = useState("");

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

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleOtherOptionChange = (event) => {
    const inputValue = event.target.value;
    const maxLength = 50;
    if (inputValue.length <= maxLength) {
      setOtherOption(inputValue);
    }
  };

  // Truyền selectedOptions và otherOption vào onActivitiesChange khi có sự thay đổi
  const handleActivitiesChangeRef = useRef(onActivitiesChange);

  useEffect(() => {
    handleActivitiesChangeRef.current = onActivitiesChange;
  }, [onActivitiesChange]);

  useEffect(() => {
    const combinedOptions = [...selectedOptions];
    if (otherOption) {
      combinedOptions.push(otherOption);
    }
    handleActivitiesChangeRef.current(combinedOptions);
  }, [selectedOptions, otherOption]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-start px-[1rem] pt-[70px] sm:px-[50rem]">
        <p className="text-[28px] font-bold">
          What activities are you interested in?
        </p>
        <p className="text-[16px] font-[400] text-[#757575]">
          Choose as many as you’d like.
        </p>
        <div className="flex flex-wrap">
          {options.map((option, index) => (
            <div
              key={index}
              className={`m-2 flex cursor-pointer items-center rounded-full border p-[7px] text-[14px] font-[600] ${
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
        <div className="mt-4 flex flex-col">
          <label htmlFor="other-option" className="flex font-[600]">
            Others{" "}
            <p className="mx-[5px] font-[400] text-[#757575]">(optional)</p>
          </label>
          <input
            id="other-option"
            placeholder="Type here"
            type="text"
            className="ml-2 rounded-md border px-[20px] py-[15px]"
            value={otherOption}
            onChange={handleOtherOptionChange}
            maxLength={50}
          />
          <p>{otherOption ? otherOption.length : 0}/50</p>
        </div>
      </div>
    </div>
  );
};

export default Step4;
