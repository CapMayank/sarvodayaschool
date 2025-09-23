/** @format */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Modal from "@/components/modals/modals";

const slides = [
	{ url: "/slideshow/MeenakshiTopper2025.jpg" },
	{ url: "/slideshow/SanjanaRajakTopper2025.jpg" },
	{ url: "/slideshow/Result2025.jpg" },
	{ url: "/slideshow/10TH2025new.jpg" },
	{ url: "/slideshow/12th2025.jpg" },
	{ url: "/slideshow/8th2025.png" },
	{ url: "/slideshow/5th2025.png" },
	{ url: "/slideshow/result2024.png" },
	{ url: "/slideshow/12th.png" },
	{ url: "/slideshow/10th.png" },
	{ url: "/slideshow/8th.png" },
	{ url: "/slideshow/5th.png" },
	{ url: "/slideshow/slide_one.png" },
];

const Slideshow = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 8000);
		return () => clearInterval(interval);
	}, [currentIndex, nextSlide]);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	}, []);

	const goToSlide = (slideIndex: number) => setCurrentIndex(slideIndex);

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	return (
		<div className="relative w-full h-[550px] md:h-[800px] group overflow-hidden flex items-center justify-center">
			{/* Blurred Background */}
			<motion.div
				key={currentIndex}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-30"
			></motion.div>

			<motion.div
				key={slides[currentIndex].url} // ✅ Unique key based on image URL
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8 }}
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="relative w-full h-full bg-center bg-contain bg-no-repeat cursor-pointer z-10"
				onClick={() => openModal(slides[currentIndex].url)}
			></motion.div>

			{/* Navigation Arrows */}

			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition z-20 shadow-lg sm:text-sm sm:p-2"
			>
				<BsChevronCompactLeft className="w-5 h-5 md:w-6 md:h-6" />
			</button>
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition z-20 shadow-lg sm:text-sm sm:p-2"
			>
				<BsChevronCompactRight className="w-5 h-5 md:w-6 md:h-6" />
			</button>

			{/* Navigation Dots */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							currentIndex === index
								? "bg-red-500 scale-125"
								: "bg-white/50 hover:bg-white"
						}`}
					></button>
				))}
			</div>

			{/* Modal */}
			{showModal && selectedImage && (
				<Modal
					showModal={showModal}
					setShowModal={setShowModal}
					imageUrl={selectedImage}
				/>
			)}
		</div>
	);
};

export default Slideshow;
