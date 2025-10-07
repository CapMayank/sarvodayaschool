/** @format */
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

const News = () => {
	const slides = [
		{
			url: "/news/result.png",
			date: "Mar 15 2024",
			title: "Annual Examination Results Announced",
			description:
				"The results of the annual examinations for the academic year 2025-2026 have been announced. The students and teachers of Sarvodaya English Higher Secondary School are pleased with the results, and are looking forward to the upcoming academic year.",
		},
		{
			url: "/news/exam.jpg",
			date: "Mar 7 2025",
			title: "Annual Examination Finished",
			description:
				"Sarvodaya English Higher Secondary School students have completed their final exams covering various subjects, and are relieved to be done with their tests. The school principal and students alike are hopeful for good results, and are looking forward to the upcoming summer holidays.",
		},
		{
			url: "/news/annual_function.jpg",
			date: "Jan 21 2025",
			title: "Annual Function Celebration",
			description:
				"Sarvodaya English Higher Secondary School celebrated its annual function with great enthusiasm. The students performed various cultural programs, and the school principal and teachers congratulated the students on their performances.",
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = React.useCallback(() => {
		setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	}, [slides.length]);

	// Auto-play functionality
	useEffect(() => {
		const timer = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(timer);
	}, [nextSlide]);

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	};

	return (
		<div className="py-16 bg-gradient-to-b from-white to-gray-50">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-2">
						Latest <span className="text-red-600">News</span>
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 mx-auto rounded-full" />
				</motion.div>

				{/* News Slider */}
				<div className="relative h-[600px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="absolute inset-0"
						>
							{/* Background Image */}
							<div
								className="absolute inset-0 bg-cover bg-center"
								style={{
									backgroundImage: `url(${slides[currentIndex].url})`,
								}}
							>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
							</div>

							{/* Content */}
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.2 }}
								className="absolute bottom-0 left-0 right-0 px-16 pb-8 pt-16" // Added horizontal padding
							>
								<div className="max-w-3xl mx-auto">
									<div className="flex items-center gap-2 text-red-500 mb-4">
										<FaCalendarAlt />
										<span className="text-white">
											{slides[currentIndex].date}
										</span>
									</div>
									<h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
										{slides[currentIndex].title}
									</h3>
									<p className="text-white/90 text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-none">
										{slides[currentIndex].description}
									</p>
								</div>
							</motion.div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation Buttons */}
					<div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
						<button
							onClick={prevSlide}
							className="p-2 rounded-full bg-black/20 backdrop-blur-lg hover:bg-black/40 transition-all duration-300 text-white pointer-events-auto"
							aria-label="Previous slide"
						>
							<BsChevronLeft size={24} />
						</button>
						<button
							onClick={nextSlide}
							className="p-2 rounded-full bg-black/20 backdrop-blur-lg hover:bg-black/40 transition-all duration-300 text-white pointer-events-auto"
							aria-label="Next slide"
						>
							<BsChevronRight size={24} />
						</button>
					</div>

					{/* Indicators */}
					<div className="absolute bottom-2 md:bottom-4 left-0 right-0 pointer-events-none">
						<div className="flex justify-center gap-2">
							{slides.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentIndex(index)}
									className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${
										currentIndex === index
											? "w-8 bg-red-500"
											: "bg-white/50 hover:bg-white"
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default News;
