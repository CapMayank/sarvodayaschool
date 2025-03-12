/** @format */
"use client";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Modal from "@/components/modals/modals";

const Slideshow = () => {
	const slides = [
		{
			url: "/slideshow/result2024.png",
		},
		{
			url: "/slideshow/12th.png",
		},
		{
			url: "/slideshow/10th.png",
		},
		{
			url: "/slideshow/8th.png",
		},
		{
			url: "/slideshow/5th.png",
		},
		{
			url: "/slideshow/slide_one.png",
		},
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
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	return (
		<div className="h-[550px] md:h-[800px] w-full m-auto relative group overflow-hidden">
			{/* Left blurred image */}
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="absolute left-0 w-full h-full bg-center bg-cover blur-md z-0"
			></div>
			{/* Right blurred image */}
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="absolute  right-0 w-full h-full bg-center bg-cover blur-md z-0"
			></div>
			{/* Main image */}
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="relative w-full h-full bg-center bg-contain bg-no-repeat duration-500 z-10 cursor-pointer"
				onClick={() => openModal(`${slides[currentIndex].url}`)}
			></div>
			{/* Left Arrow */}
			<div className=" group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
				<BsChevronCompactLeft onClick={prevSlide} size={30} />
			</div>
			{/* Right Arrow */}
			<div className=" group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
				<BsChevronCompactRight onClick={nextSlide} size={30} />
			</div>
			{/* Navigation dots */}
			<div className="flex top-4 justify-center py-2 z-20">
				{slides.map((slide, slideIndex) => (
					<div
						key={slideIndex}
						onClick={() => goToSlide(slideIndex)}
						className="text-2xl cursor-pointer"
					>
						<RxDotFilled />
					</div>
				))}
			</div>
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
