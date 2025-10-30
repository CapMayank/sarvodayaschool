/** @format */

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Modal from "@/components/modals/modals";

interface Slide {
	id: number;
	title?: string;
	imageUrl: string;
	isActive: boolean;
	order: number;
}

const Slideshow = () => {
	const [slides, setSlides] = useState<Slide[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch slideshows from API
	useEffect(() => {
		const fetchSlideshows = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/slideshows");

				if (!response.ok) {
					throw new Error("Failed to fetch slideshows");
				}

				const data = await response.json();

				// Filter active slides and sort by order
				const activeSlides = data
					.filter((slide: Slide) => slide.isActive)
					.sort((a: Slide, b: Slide) => a.order - b.order);

				setSlides(activeSlides);
				setError(null);
			} catch (err) {
				console.error("Error fetching slideshows:", err);
				setError("Failed to load slideshows");
			} finally {
				setLoading(false);
			}
		};

		fetchSlideshows();
	}, []);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	}, [slides.length]);

	useEffect(() => {
		if (slides.length === 0) return;

		const interval = setInterval(nextSlide, 8000);
		return () => clearInterval(interval);
	}, [currentIndex, nextSlide, slides.length]);

	const prevSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	}, [slides.length]);

	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex);
	};

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	// Loading state
	if (loading) {
		return (
			<div className="relative w-full h-[550px] md:h-[800px] flex items-center justify-center bg-gray-100">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="relative w-full h-[550px] md:h-[800px] flex items-center justify-center bg-gray-100">
				<div className="text-center">
					<p className="text-red-600 text-xl mb-2">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	// No slides available
	if (slides.length === 0) {
		return (
			<div className="relative w-full h-[550px] md:h-[800px] flex items-center justify-center bg-gray-100">
				<p className="text-gray-600 text-xl">No slideshows available</p>
			</div>
		);
	}

	return (
		<div className="relative w-full h-[550px] md:h-[800px] group overflow-hidden flex items-center justify-center">
			{/* Blurred Background */}
			<motion.div
				key={currentIndex}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
				className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-30"
			/>

			{/* Main Image */}
			<motion.div
				key={slides[currentIndex].imageUrl}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8 }}
				style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
				className="relative w-full h-full bg-center bg-contain bg-no-repeat cursor-pointer z-10"
				onClick={() => openModal(slides[currentIndex].imageUrl)}
			/>

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
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>

			{/* Modal */}
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				imageUrl={selectedImage}
			/>
		</div>
	);
};

export default Slideshow;
