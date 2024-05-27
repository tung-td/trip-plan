import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "../components/CreateAI_Component/Step1";
import Step2 from "../components/CreateAI_Component/Step2";
import Step3 from "../components/CreateAI_Component/Step3";
import Step4 from "../components/CreateAI_Component/Step4";

import ReactLoading from "react-loading";
import { IoCloseOutline } from "react-icons/io5";

const AiTripCreate = () => {
  const API = process.env.REACT_APP_SERVER_DOMAIN_AI;

  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayLength, setDayLength] = useState("");
  const [travelers, setTravelers] = useState("1 people");
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

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const promptText = `Plan a ${dayLength}-day trip to ${destination} from ${startDate} to ${endDate} for ${travelers}, including ${activities.join(", ")}. Requirements: * ${dayLength} days * ${travelers} people * Theme: ${activities.join(", ")} * Location: ${destination}`;

  const handleSubmit = () => {
    setLoading(true);
    fetch(`${API}generateGemini`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptText,
        destination: destination,
        startDate: formatDateToYYYYMMDD(startDate),
        endDate: formatDateToYYYYMMDD(endDate),
        dayLength: dayLength,
        travelers: travelers,
        activities: activities,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode == 500) {
          alert("Please submit again");
        } else {
          navigate("/tripresultAI", {
            state: {
              tripData: data,
              destination: destination,
              startDate: formatDateToYYYYMMDD(startDate),
              endDate: formatDateToYYYYMMDD(endDate),
              dayLength: dayLength,
              travelers: travelers,
              activities: activities,
              promptText: promptText,
            },
          });
        }
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

      <div
        className="absolute right-[30px] top-[30px] text-[30px] hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoCloseOutline />
      </div>

      {renderStep()}

      <div className="fixed bottom-0 flex w-full justify-between border-t p-[0.5rem] shadow-lg sm:p-[23px]">
        {step !== 1 && (
          <button
            onClick={prevStep}
            className="rounded-[24px] bg-black px-[50px] py-[12px] text-[16px] font-bold text-white sm:px-[84px]"
          >
            Back
          </button>
        )}
        {step !== 4 ? (
          <button
            onClick={nextStep}
            className="rounded-[24px] bg-black px-[50px] py-[12px] text-[16px] font-bold text-white sm:px-[84px]"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="rounded-[24px] bg-black px-[50px] py-[12px] text-[16px] font-bold text-white sm:px-[84px]"
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
