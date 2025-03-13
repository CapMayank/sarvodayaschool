/** @format */
"use client";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Result = () => {
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const targetDate = new Date("2025-03-15T05:30:00Z"); // 11 AM IST is 5:30 AM UTC

		const updateTimer = () => {
			const currentDate = new Date();
			const difference = targetDate.getTime() - currentDate.getTime();

			if (difference <= 0) {
				setIsButtonEnabled(true);
				setTimeLeft("00:00:00:00");
			} else {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((difference % (1000 * 60)) / 1000);

				setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
			}
		};

		const timerInterval = setInterval(updateTimer, 1000);

		return () => clearInterval(timerInterval);
	}, []);

	return (
		<>
			<Header title="Result" />
			<div className="flex justify-center items-center bg-gray-100 p-8">
				<div className="flex flex-col gap-6 bg-white/80 backdrop-blur-lg shadow-2xl p-10 rounded-2xl text-center w-full max-w-2xl border border-gray-300">
					<h2 className="text-red-600 text-4xl md:text-5xl font-extrabold">
						Annual Examination Result
					</h2>
					<p className="text-gray-600 text-lg font-medium">
						Stay updated with the latest results for your academic session.
					</p>

					{/* Session Details */}
					<div className="flex flex-col gap-2 text-gray-700 text-xl font-semibold">
						<div className="flex items-center justify-center gap-2">
							<FaCheckCircle className="text-green-600 text-2xl" />
							<span>Session: 2024-25</span>
						</div>
						<div className="flex items-center justify-center gap-2">
							<FaCheckCircle className="text-green-600 text-2xl" />
							<span>Date: 15/03/2025</span>
						</div>
					</div>

					{/* Countdown Timer */}
					<div className="text-gray-700 text-2xl font-semibold">
						{isButtonEnabled
							? "Results are now available!"
							: `Time left: ${timeLeft}`}
					</div>

					{/* Button */}
					<a href="https://results.sarvodayaschool.co.in/find-result.php">
						<button
							className={`bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg transition-transform transform ${
								isButtonEnabled
									? "hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-red-300"
									: "opacity-50 cursor-not-allowed"
							}`}
							disabled={!isButtonEnabled}
						>
							Get Result
						</button>
					</a>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Result;
