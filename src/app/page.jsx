"use client";
import React, { useState } from "react";
import { LoanCategoryCard } from "@/Components/Landing/LoanCategoryCard.jsx";
import Navbar from "@/Components/Common/Navbar.jsx";
import Footer from "@/Components/Common/Footer.jsx";
import LoanCalculator from "@/Components/LoanCalculator";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loanCategories = [
    { title: "Wedding", description: "Loans for Valima, Jahez, and more." },
    { title: "Home Construction", description: "Build your dream home." },
    { title: "Business Startup", description: "Kickstart your business." },
    { title: "Education", description: "Invest in education." },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 p-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Saylani Welfare Loan Program
          </h1>
          <p className="text-lg text-gray-600">
            Providing financial assistance for your needs.
          </p>
        </header>

        {/* Loan Categories Section */}
        <section className="mb-12">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center underline">
            Loan Categories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
            {loanCategories.map((category, index) => (
              <LoanCategoryCard
                key={index}
                title={category.title}
                description={category.description}
                onSelect={() => handleCategorySelect(category.title)}
              />
            ))}
          </div>
        </section>

        {/* Loan Calculator Section */}
        <LoanCalculator selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
}
