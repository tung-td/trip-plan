import React from "react";

const AiTripCreate = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-center border-b p-[35px]">
        Powered by AI
      </div>

      {/* list card take request */}
      <div className="flex w-full justify-center p-[35px] text-[28px] font-bold">
        Where do you want to go?
      </div>
      <input
        className="h-[56px] w-[30%] rounded-[30px] border px-[40px] py-[10px]"
        placeholder="Search by city"
      />
      <div className="w-full px-[28%]">
        <p className="mt-[96px] text-[24px] font-[600]">Popular destinations</p>
        <div>List here...</div>
      </div>

      <div className="fixed bottom-0 flex w-full justify-between border-t p-[23px] shadow-lg">
        <button className="rounded-[24px] bg-black px-[84px] py-[12px] text-[16px] font-bold text-white">
          Back
        </button>
        <button className="rounded-[24px] bg-black px-[84px] py-[12px] text-[16px] font-bold text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default AiTripCreate;
