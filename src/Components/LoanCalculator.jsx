    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import axios from "axios";

    const categories = [
    {
        name: "Wedding",
        subcategories: [
        { name: "Valima", maxLoan: 300000 },
        { name: "Furniture", maxLoan: 200000 },
        { name: "Valima Food", maxLoan: 150000 },
        { name: "Jahez", maxLoan: 350000 },
        ],
        loanPeriods: [1, 2, 3],
    },
    {
        name: "Home Construction",
        subcategories: [
        { name: "Structure", maxLoan: 500000 },
        { name: "Finishing", maxLoan: 400000 },
        { name: "Loan", maxLoan: 600000 },
        ],
        loanPeriods: [3, 4, 5],
    },
    {
        name: "Business Startup",
        subcategories: [
        { name: "Buy Stall", maxLoan: 100000 },
        { name: "Advance Rent for Shop", maxLoan: 200000 },
        { name: "Shop Assets", maxLoan: 300000 },
        { name: "Shop Machinery", maxLoan: 400000 },
        ],
        loanPeriods: [1, 2, 3, 4, 5],
    },
    {
        name: "Education",
        subcategories: [
        { name: "University Fees", maxLoan: 500000 },
        { name: "Child Fees Loan", maxLoan: 250000 },
        ],
        loanPeriods: [1, 2, 3, 4],
    },
    ];

    export default function LoanCalculator({ selectedCategory }) {
    const [subcategory, setSubcategory] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");
    const [initialDeposit, setInitialDeposit] = useState("");
    const [loanBreakdown, setLoanBreakdown] = useState(null);

    const url = "https://backend-hackathon-henna.vercel.app";
    const router = useRouter();
    const selectedCategoryDetails = categories.find(
        (cat) => cat.name === selectedCategory
    );

    const handleCalculateLoan = () => {
        if (
        !selectedCategory ||
        !subcategory ||
        !loanAmount ||
        !loanPeriod ||
        !initialDeposit
        ) {
        alert("Please fill out all fields.");
        return;
        }

        const selectedSubcategoryDetails =
        selectedCategoryDetails?.subcategories.find(
            (sub) => sub.name === subcategory
        );

        const maxLoanAmount = selectedSubcategoryDetails?.maxLoan || 0;

        if (parseInt(loanAmount, 10) > maxLoanAmount) {
        alert(
            `The entered loan amount exceeds the maximum allowed for this subcategory. Max allowed: ${maxLoanAmount} PKR`
        );
        return;
        }

        const adjustedLoanAmount = Math.min(
        parseInt(loanAmount, 10),
        maxLoanAmount
        );

        if (adjustedLoanAmount <= 0) {
        alert("Loan amount must be greater than zero.");
        return;
        }

        const totalRepayment = adjustedLoanAmount - parseInt(initialDeposit, 10);
        const monthlyPayment = totalRepayment / (parseInt(loanPeriod, 10) * 12);

        setLoanBreakdown({
        loanAmount: adjustedLoanAmount,
        initialDeposit: parseInt(initialDeposit, 10),
        totalRepayment,
        loanPeriod,
        monthlyPayment: Math.round(monthlyPayment),
        });
    };

   const handleApplyLoan = async () => {
     if (!loanBreakdown) {
       alert("Please calculate the loan before applying.");
       return;
     }

     try {
       const response = await axios.post(`${url}/api/v1/loan`, {
         selectedCategory, // You already have this defined
         selectedSubcategory: subcategory, // Use `subcategory` state here
         loanAmount: loanBreakdown.loanAmount, // Adjust to use breakdown values
         initialDeposit: loanBreakdown.initialDeposit,
         monthlyPayment: loanBreakdown.monthlyPayment,
         loanPeriod: loanBreakdown.loanPeriod,
         totalRepayment: loanBreakdown.totalRepayment,
       });

       if (response.status !== 201) {
         alert("Failed to apply for loan.");
       } else {
         alert("Loan application submitted successfully!");
         setLoanBreakdown(null); // Reset the form
         setSubcategory("")
         setLoanAmount("")
         setLoanPeriod("")
         setLoanAmount("")
         setInitialDeposit("")
         router.push("/SignUp")
       }
     } catch (error) {
       console.error("Error applying for loan:", error);
       alert("An error occurred. Please try again.");
     }
   };


    return (
        <div className="p-6 bg-white shadow-md rounded-lg text-black">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Loan Calculator</h2>
        <p className="text-gray-600 mb-4">
            Selected Loan Category: <strong>{selectedCategory || "None"}</strong>
        </p>

        {selectedCategoryDetails && (
            <div className="space-y-4">
            <div>
                <label
                htmlFor="subcategory"
                className="block text-sm font-medium text-gray-700"
                >
                Subcategory
                </label>
                <select
                id="subcategory"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">Select Subcategory</option>
                {selectedCategoryDetails.subcategories.map((sub) => (
                    <option key={sub.name} value={sub.name}>
                    {sub.name} (Max Loan: {sub.maxLoan} PKR)
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label
                htmlFor="loanAmount"
                className="block text-sm font-medium text-gray-700"
                >
                Loan Amount
                </label>
                <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter loan amount"
                />
            </div>

            <div>
                <label
                htmlFor="initialDeposit"
                className="block text-sm font-medium text-gray-700"
                >
                Initial Deposit
                </label>
                <input
                type="number"
                id="initialDeposit"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter initial deposit"
                />
            </div>

            <div>
                <label
                htmlFor="loanPeriod"
                className="block text-sm font-medium text-gray-700"
                >
                Loan Period (Years)
                </label>
                <select
                id="loanPeriod"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">Select Loan Period</option>
                {selectedCategoryDetails.loanPeriods.map((period) => (
                    <option key={period} value={period}>
                    {period} Year{period > 1 ? "s" : ""}
                    </option>
                ))}
                </select>
            </div>

            <button
                type="button"
                onClick={handleCalculateLoan}
                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Calculate Loan
            </button>
            </div>
        )}

        {loanBreakdown && (
            <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Loan Breakdown
            </h3>
            <p>
                <strong>Loan Amount:</strong> {loanBreakdown.loanAmount} PKR
            </p>
            <p>
                <strong>Initial Deposit:</strong> {loanBreakdown.initialDeposit} PKR
            </p>
            <p>
                <strong>Total Repayment:</strong> {loanBreakdown.totalRepayment} PKR
            </p>
            <p>
                <strong>Loan Period:</strong> {loanBreakdown.loanPeriod} years
            </p>
            <p>
                <strong>Monthly Payment:</strong> {loanBreakdown.monthlyPayment} PKR
            </p>

            <button
                type="button"
                onClick={handleApplyLoan}
                className="mt-4 w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Apply for Loan
            </button>
            </div>
        )}
        </div>
    );
    }
