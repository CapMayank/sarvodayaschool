/** @format */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Modal from "@/components/modals/modals";

const slides = [
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

	// Auto-slide functionality
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 5000);
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
		<div className="relative w-full h-[550px] md:h-[800px] group overflow-hidden">
			{/* Blurred Background */}
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="absolute inset-0 bg-cover bg-center blur-lg scale-110 opacity-40 transition-all duration-500"
			></div>

			{/* Main Image */}
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="relative w-full h-full bg-center bg-contain bg-no-repeat duration-500 cursor-pointer z-10"
				onClick={() => openModal(slides[currentIndex].url)}
			></div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition z-20"
			>
				<BsChevronCompactLeft size={30} />
			</button>
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition z-20"
			>
				<BsChevronCompactRight size={30} />
			</button>

			{/* Navigation Dots */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`text-2xl transition transform hover:scale-125 ${
							currentIndex === index ? "text-red-500 scale-125" : "text-white"
						}`}
					>
						<RxDotFilled />
					</button>
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
