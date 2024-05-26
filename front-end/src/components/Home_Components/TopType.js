import React from "react";

import hotels from "../../assets/TopType/hotels.png";
import apartments from "../../assets/TopType/apartments.png";
import resorts from "../../assets/TopType/resorts.png";
import villas from "../../assets/TopType/villas.png";
const TopType = () => {
  const accommodationTypes = [
    { id: 1, image: hotels, name: "Hotels" },
    { id: 2, image: apartments, name: "Apartments" },
    { id: 3, image: resorts, name: "Resorts" },
    { id: 4, image: villas, name: "Villas" },
  ];

  return (
    <div className="mt-[30px] px-[1rem] sm:px-[8rem]">
      <h1 className="mt-[20px] flex flex-col items-end justify-end text-[29px] text-black md:text-[40px]">
        Top Accommodations
        <div className="mt-[10px] h-[3px] w-[12rem] bg-[#FF7757] sm:w-[18rem] md:w-[365px]"></div>
      </h1>

      <div className="mt-8 flex w-full flex-wrap justify-center md:justify-between">
        {accommodationTypes.map((type) => (
          <div
            key={type.id}
            className="relative mb-[20px] flex flex-col items-center"
          >
            <img
              src={type.image}
              alt={type.name}
              className="h-[15rem] rounded-[9px] object-cover sm:h-[10rem] sm:w-[100%] 14inch:w-[370px]"
            />
            <h2 className="absolute bottom-[20px] left-[20px] text-xl font-[900] text-white">
              {type.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopType;
