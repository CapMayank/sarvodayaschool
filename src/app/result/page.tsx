/** @format */

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Result = () => {
	return (
		<>
			<Header title="Result" />
			<div className="flex justify-center items-center  bg-gray-100 p-8">
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

					{/* Button */}
					<a href="https://results.sarvodayaschool.co.in/find-result.php">
						<button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-red-300">
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
