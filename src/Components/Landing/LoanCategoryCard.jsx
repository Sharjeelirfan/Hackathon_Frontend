// Components/Landing/LoanCategoryCard.jsx
import React from "react";

export const LoanCategoryCard = ({ title, description, onSelect }) => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button
        onClick={() => onSelect(title)}
        className="mt-4 px-4 py-2 bg-[#8dc63f] text-white rounded hover:bg-blue-600 active:bg-[#8dc63f]"
      >
        Get Loan
      </button>
    </div>
  );
};
