import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Step2 = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onDayLengthChange,
}) => {
  // Hàm xử lý khi ngày bắt đầu thay đổi
  const handleStartDateChange = (date) => {
    onStartDateChange(date);
    const dayLength = calculateDayLength(date, endDate);
    onDayLengthChange(dayLength);
  };

  // Hàm xử lý khi ngày kết thúc thay đổi
  const handleEndDateChange = (date) => {
    onEndDateChange(date);
    const dayLength = calculateDayLength(startDate, date);
    onDayLengthChange(dayLength);
  };

  // Hàm tính toán độ dài của khoảng thời gian
  const calculateDayLength = (start, end) => {
    if (!start || !end) return 0;
    const dayLengthInMs = Math.abs(end - start);
    const dayLength = Math.ceil(dayLengthInMs / (1000 * 60 * 60 * 24));
    return dayLength;
  };

  const today = new Date();
  const maxEndDate = startDate ? new Date(startDate) : today;
  maxEndDate.setDate(maxEndDate.getDate() + 7);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full justify-center p-[35px] text-[28px] font-bold">
        When do you want to go?
      </div>

      {/* Pick start date */}
      <div className="mb-4">
        <label htmlFor="start-date">Start Date:</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={handleStartDateChange}
          className="rounded-md border px-4 py-2"
        />
      </div>

      {/* Pick end date */}
      <div className="mb-4">
        <label htmlFor="end-date">End Date:</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || today}
          maxDate={maxEndDate}
          className="rounded-md border px-4 py-2"
        />
      </div>

      {/* Display day length */}
      <p>Day Length: {calculateDayLength(startDate, endDate)} days</p>
    </div>
  );
};

export default Step2;
