"use client";

import { useState } from "react";

export default function LoanRequestForm() {
  const [guarantor1, setGuarantor1] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  });
  const [guarantor2, setGuarantor2] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  });
  const [statement, setStatement] = useState(null);
  const [salarySheet, setSalarySheet] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    address: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Form validation logic (you can expand this)
    if (
      !guarantor1.name ||
      !guarantor1.email ||
      !guarantor1.location ||
      !guarantor1.cnic ||
      !guarantor2.name ||
      !guarantor2.email ||
      !guarantor2.location ||
      !guarantor2.cnic ||
      !personalInfo.address ||
      !personalInfo.phoneNumber
    ) {
      setErrorMessage("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the backend API (make sure to replace with the correct endpoint)
      const response = await fetch("/api/v1/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guarantor1,
          guarantor2,
          statement,
          salarySheet,
          personalInfo,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Loan request submitted successfully!");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Something went wrong!");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-black">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Loan Request Submission
        </h2>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guarantor 1 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Guarantor 1</h3>
            <input
              type="text"
              placeholder="Name"
              value={guarantor1.name}
              onChange={(e) =>
                setGuarantor1({ ...guarantor1, name: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={guarantor1.email}
              onChange={(e) =>
                setGuarantor1({ ...guarantor1, email: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={guarantor1.location}
              onChange={(e) =>
                setGuarantor1({ ...guarantor1, location: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="CNIC"
              value={guarantor1.cnic}
              onChange={(e) =>
                setGuarantor1({ ...guarantor1, cnic: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Guarantor 2 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Guarantor 2</h3>
            <input
              type="text"
              placeholder="Name"
              value={guarantor2.name}
              onChange={(e) =>
                setGuarantor2({ ...guarantor2, name: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={guarantor2.email}
              onChange={(e) =>
                setGuarantor2({ ...guarantor2, email: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={guarantor2.location}
              onChange={(e) =>
                setGuarantor2({ ...guarantor2, location: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="CNIC"
              value={guarantor2.cnic}
              onChange={(e) =>
                setGuarantor2({ ...guarantor2, cnic: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Statement and Salary Sheet */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Statement (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setStatement(e.target.files[0])}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary Sheet (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setSalarySheet(e.target.files[0])}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Personal Info
            </h3>
            <input
              type="text"
              placeholder="Address"
              value={personalInfo.address}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, address: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={personalInfo.phoneNumber}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  phoneNumber: e.target.value,
                })
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? "Submitting..." : "Submit Loan Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
