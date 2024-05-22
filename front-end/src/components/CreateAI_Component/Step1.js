import React, { useState } from "react";

const Step1 = ({ nextStep, onDestinationChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const destinations = ["Da Nang", "Đà Nẵng"];

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    const filteredResults = destinations.filter((destination) =>
      destination.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredDestinations(filteredResults);
  };

  const handleSelectDestination = (destination) => {
    onDestinationChange(destination);
    nextStep();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full justify-center p-[35px] text-[28px] font-bold">
        Where do you want to go?
      </div>
      <input
        className="h-[56px] w-[30%] rounded-[30px] border px-[40px] py-[10px]"
        placeholder="Search by city"
        value={searchInput}
        onChange={handleInputChange}
      />
      {/* Hiển thị dropdown chỉ khi có kết quả và không phải là Đà Nẵng hoặc Da Nang */}
      {searchInput.length > 0 && (
        <div className="absolute z-10 mt-[5rem] w-[30%] rounded-[15px] border bg-white py-[1rem] shadow-lg">
          {filteredDestinations.map((result, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelectDestination(result)}
            >
              {result}
            </div>
          ))}
        </div>
      )}

      <div className="w-full px-[28%]">
        <p className="mt-[96px] text-[24px] font-[600]">Popular destinations</p>
        <div>List here...</div>
      </div>
    </div>
  );
};

export default Step1;
