import React, { useState } from "react";

const ReviewForm = ({ onSubmit, onClose, userID, day, locationID }) => {
  const [ratingRV, setRatingRV] = useState(5);
  const [text, setText] = useState("");
  const [date, setDate] = useState(day);

  console.log({ userID, locationID, ratingRV, text, date });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userID, locationID, ratingRV, text, date });

    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[50%] rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl">Give your review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block">Rating:</label>
            <select
              value={ratingRV}
              onChange={(e) => setRatingRV(parseInt(e.target.value))}
              className="w-full rounded border p-2"
              required
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} {star === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block">Review:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-[#FF7757] px-4 py-2 text-white hover:bg-[#FF7757] hover:opacity-70"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
