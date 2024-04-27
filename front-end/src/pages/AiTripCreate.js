import React, { useState } from "react";
import Step1 from "../components/CreateAI_Component/Step1";
import Step2 from "../components/CreateAI_Component/Step2";
import Step3 from "../components/CreateAI_Component/Step3";
import Step4 from "../components/CreateAI_Component/Step4";

const AiTripCreate = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayLength, setDayLength] = useState("");
  const [travelers, setTravelers] = useState("Solo");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [fullResData, setFullResData] = useState(null);

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
      body: JSON.stringify({ prompt: promptText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFullResData(data);
        setTripPlan(data.data.tripPlan);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

  console.log("ahsdjaslkjdkas");
  console.log(fullResData);

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

      {loading && (
        <div className="skeleton-container">
          <p>Loading...</p>
        </div>
      )}
      {!loading && tripPlan && (
        <div className="trip-plan-container px-[100px] py-[50px]">
          <h1>{fullResData.data.introduction}</h1>
          {tripPlan.map((dayPlan, index) => (
            <div key={index}>
              <h3>{dayPlan.day}</h3>
              <p>{dayPlan.description}</p>
              <ul>
                {dayPlan.locations.map((location, index) => (
                  <li key={index}>
                    <h4>{location.locationName}</h4>
                    <p>{location.locationDescription}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h2>{fullResData.data.conclusion}</h2>
        </div>
      )}
    </div>
  );
};

export default AiTripCreate;
