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
    <div className="mt-[70px] pl-[166px] pr-[166px]">
      <h1 className="flex flex-col items-end justify-end text-[40px] text-black">
        Top Accommodation Types
        <div className="mt-[10px] h-[3px] w-[365px] bg-[#FF7757]"></div>
      </h1>

      <div className="mt-8 flex flex-wrap justify-between">
        {accommodationTypes.map((type) => (
          <div
            key={type.id}
            className="relative mb-[20px] flex flex-col items-center shadow-lg"
          >
            <img
              src={type.image}
              alt={type.name}
              className="h-[200px] w-[370px] rounded-[9px] object-cover"
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
