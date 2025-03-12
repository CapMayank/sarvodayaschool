/** @format */
"use client";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

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
			title: "Annual Funtion Celebration",
			description:
				"Sarvodaya English Higher Secondary School celebrated its annual function with great enthusiasm. The students performed various cultural programs, and the school principal and teachers congratulated the students on their performances. The school administration is looking forward to the upcoming academic year.",
		},

		// {
		// 	url: "/news/summerbreak.jpg",
		// 	date: "Apr 8 2024",
		// 	title: "Classes will Resume After Summer Break",
		// 	description:
		// 		"The class will resume on 1 5 June 2024 after the summer break. The school administration is looking forward to welcoming the students back to school, and is planning various activities and events for the upcoming academic year.",
		// },
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex);
	};

	return (
		<div className="max-w-[1400px] h-[780px] w-full m-auto py-8 px-4 mb-28 relative group">
			<div className="m-2">
				<h2 className="text-center heading-text-red text-4xl">News</h2>
				<h2 className="text-center heading-text-yellow text-4xl">
					Recent from News
				</h2>
			</div>

			<div
				style={{
					backgroundImage: `url(${slides[currentIndex].url})`,
				}}
				className="flex justify-center items-end p-8 w-full h-full rounded-2xl bg-center bg-cover duration-500"
			>
				<div className="backdrop-blur-lg bg-red-500/30 p-4 rounded-md">
					<h1 className="text-yellow-500 text-4xl font-black">
						{slides[currentIndex].title}
					</h1>
					<p className="text-white hidden md:block text-lg font-bold">
						{slides[currentIndex].description}
					</p>
					<p className="text-white text-lg font-bold">
						<FontAwesomeIcon icon={faCalendar} size="1x" className="mr-4" />
						{slides[currentIndex].date}
					</p>
				</div>
			</div>

			{/* Left Arrow */}
			<div className=" group-hover:block absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
				<BsChevronCompactLeft onClick={prevSlide} size={30} />
			</div>
			{/* Right Arrow */}
			<div className=" group-hover:block absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
				<BsChevronCompactRight onClick={nextSlide} size={30} />
			</div>

			<div className="flex justify-center py-2">
				{slides.map((_, slideIndex) => (
					<div
						key={slideIndex}
						onClick={() => goToSlide(slideIndex)}
						className="text-2xl cursor-pointer"
					>
						<RxDotFilled />
					</div>
				))}
			</div>
		</div>
	);
};

export default News;
