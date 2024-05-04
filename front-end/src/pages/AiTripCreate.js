import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "../components/CreateAI_Component/Step1";
import Step2 from "../components/CreateAI_Component/Step2";
import Step3 from "../components/CreateAI_Component/Step3";
import Step4 from "../components/CreateAI_Component/Step4";

import ReactLoading from "react-loading";

const AiTripCreate = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayLength, setDayLength] = useState("");
  const [travelers, setTravelers] = useState("Solo");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleDestinationChange = (value) => {
    setDestination(value);
  };

  const handleDayLengthChange = (value) => {
    setDayLength(value);
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  const handleTravelersChange = (value) => {
    setTravelers(value);
  };

  const handleActivitiesChange = (selectedActivities) => {
    setActivities(selectedActivities);
  };

  const promptText = `Lập kế hoạch du lịch ${destination} từ ${startDate} đến ${endDate} là ${dayLength} ngày cho ${travelers} người, ${activities.join(", ")}. **Yêu cầu:** * ${startDate} - ${endDate} * ${travelers} * Chủ đề: ${activities}, danh lam thắng cảnh * Địa điểm: ${destination} **Mong muốn:** * Lịch trình chi tiết ${startDate} - ${endDate}: Ngày x: Giới thiệu địa điểm buổi sáng: * Buổi sáng: Tham quan, hoạt động vui chơi, nhà hàng. * Buổi chiều: Tham quan, hoạt động vui chơi, nhà hàng. * Buổi tối: Hoạt động vui chơi, nhà hàng`;

  const handleSubmit = () => {
    setLoading(true);
    fetch("http://localhost:4000/googleAi/generateGemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptText,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        dayLength: dayLength,
        travelers: travelers,
        activities: activities,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/tripresultAI", {
          state: {
            tripData: data,
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            dayLength: dayLength,
            travelers: travelers,
            activities: activities,
            promptText: promptText,
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const LoadingAI = () => (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <ReactLoading type="cubes" color="#fff" height={100} width={100} />
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            nextStep={nextStep}
            onDestinationChange={handleDestinationChange}
          />
        );
      case 2:
        return (
          <Step2
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onDayLengthChange={handleDayLengthChange}
          />
        );
      case 3:
        return (
          <Step3
            travelers={travelers}
            onTravelersChange={handleTravelersChange}
          />
        );
      case 4:
        return (
          <Step4
            activities={activities}
            onActivitiesChange={handleActivitiesChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-center border-b p-[35px]">
        Powered by AI
      </div>

      {renderStep()}

      <div className="fixed bottom-0 flex w-full justify-between border-t p-[23px] shadow-lg">
        {step !== 1 && (
          <button
            onClick={prevStep}
            className="rounded-[24px] bg-black px-[84px] py-[12px] text-[16px] font-bold text-white"
          >
            Back
          </button>
        )}
        {step !== 4 ? (
          <button
            onClick={nextStep}
            className="rounded-[24px] bg-black px-[84px] py-[12px] text-[16px] font-bold text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="rounded-[24px] bg-black px-[84px] py-[12px] text-[16px] font-bold text-white"
          >
            Submit
          </button>
        )}
      </div>

      {loading && LoadingAI()}
    </div>
  );
};

export default AiTripCreate;
