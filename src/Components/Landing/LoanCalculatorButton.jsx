import React from "react";
import Link from "next/link";

export function LoanCalculatorButton() {
  return (
    <Link
      className="inline-block bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700"
      href={"LoanCalculator"}
    >
      Open Loan Calculator
    </Link>
  );
}
