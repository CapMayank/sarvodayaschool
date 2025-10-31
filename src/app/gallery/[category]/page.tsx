/** @format */

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { motion, AnimatePresence } from "framer-motion";
import { ImageGridSkeleton } from "@/components/LoadingSkeleton";
import {
	X,
	ChevronLeft,
	ChevronRight,
	Search,
	ZoomIn,
	Maximize2,
} from "lucide-react";

import { useSwipeable } from "react-swipeable";

interface Image {
	id: string;
	publicId: string;
	width: number;
	height: number;
	format: string;
	url: string;
}

const categoryTitles: Record<string, string> = {
	Cultural_Programme: "Cultural Programme",
	Stall: "Stall",
	Science_Exhibition: "Science Exhibition",
	Sports: "Sports",
	Class_Activities: "Class Activities",
};

export default function CategoryGallery() {
	const params = useParams();
	const [images, setImages] = useState<Image[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [title, setTitle] = useState("");

	useEffect(() => {
		const fetchImages = async () => {
			const resolvedParams = await params;
			const category = resolvedParams.category as string;

			fetch(`/api/gallery/${category}`)
				.then((res) => res.json())
				.then((data) => {
					setImages(data.images || []);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching images:", error);
					setLoading(false);
				});
		};

		fetchImages();
	}, [params]);

	useEffect(() => {
		const getTitle = async () => {
			const resolvedParams = await params;
			const category = resolvedParams.category as string;
			setTitle(categoryTitles[category] || category);
		};
		getTitle();
	}, [params]);

	// Open lightbox
	const openLightbox = (image: Image, index: number) => {
		setSelectedImage(image);
		setCurrentIndex(index);
		document.body.style.overflow = "hidden"; // Prevent scrolling
	};

	// Close lightbox
	const closeLightbox = () => {
		setSelectedImage(null);
		document.body.style.overflow = "unset";
	};

	// Navigate to previous image
	const goToPrevious = useCallback(() => {
		if (currentIndex > 0) {
			const newIndex = currentIndex - 1;
			setCurrentIndex(newIndex);
			setSelectedImage(images[newIndex]);
		}
	}, [currentIndex, images]);

	// Navigate to next image
	const goToNext = useCallback(() => {
		if (currentIndex < images.length - 1) {
			const newIndex = currentIndex + 1;
			setCurrentIndex(newIndex);
			setSelectedImage(images[newIndex]);
		}
	}, [currentIndex, images]);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => goToNext(),
		onSwipedRight: () => goToPrevious(),
		trackMouse: true,
	});

	// Keyboard navigation
	useEffect(() => {
		if (!selectedImage) return;

		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeLightbox();
			} else if (e.key === "ArrowLeft") {
				goToPrevious();
			} else if (e.key === "ArrowRight") {
				goToNext();
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [selectedImage, currentIndex, images, goToNext, goToPrevious]);

	return (
		<>
			<Header title={title} />

			<div className="max-w-7xl mx-auto px-4 py-12 mt-5">
				<h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
					{title}
				</h1>

				{loading ? (
					<ImageGridSkeleton />
				) : images.length === 0 ? (
					<div className="text-center py-12 text-gray-500">
						No images found in this gallery
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{images.map((image, index) => (
							<motion.div
								key={image.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: index * 0.05 }}
								className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
								onClick={() => openLightbox(image, index)}
							>
								<CldImage
									src={image.publicId}
									alt={`Gallery image ${index + 1}`}
									width={400}
									height={400}
									crop="fill"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									className="object-cover group-hover:scale-110 transition-transform duration-300"
								/>
								{/* Hover overlay */}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
									<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
										<ZoomIn className="w-8 h-8 text-white" />
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}

				{/* Lightbox Modal */}
				<AnimatePresence>
					{selectedImage && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
							onClick={closeLightbox}
						>
							{/* Close button */}
							<button
								className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 rounded-full hover:bg-white/10"
								onClick={(e) => {
									e.stopPropagation();
									closeLightbox();
								}}
								aria-label="Close"
							>
								<X className="w-8 h-8" />
							</button>

							{/* Image counter */}
							<div className="absolute top-4 left-4 text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-full z-50">
								{currentIndex + 1} / {images.length}
							</div>

							{/* Previous button */}
							{currentIndex > 0 && (
								<button
									className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 rounded-full hover:bg-white/10"
									onClick={(e) => {
										e.stopPropagation();
										goToPrevious();
									}}
									aria-label="Previous image"
								>
									<ChevronLeft className="w-10 h-10" />
								</button>
							)}

							{/* Next button */}
							{currentIndex < images.length - 1 && (
								<button
									className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 rounded-full hover:bg-white/10"
									onClick={(e) => {
										e.stopPropagation();
										goToNext();
									}}
									aria-label="Next image"
								>
									<ChevronRight className="w-10 h-10" />
								</button>
							)}

							{/* Image container */}
							<motion.div
								{...swipeHandlers}
								key={selectedImage.id}
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="relative max-w-7xl max-h-[90vh] mx-auto"
								onClick={(e) => e.stopPropagation()}
							>
								<CldImage
									src={selectedImage.publicId}
									width={selectedImage.width}
									height={selectedImage.height}
									alt={`Image ${currentIndex + 1}`}
									className="max-h-[90vh] w-auto rounded-lg"
								/>
							</motion.div>

							{/* Navigation hints */}
							<div className="absolute bottom-4 right-4 text-white/60 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
								<p>← → Arrow keys to navigate</p>
								<p>ESC to close</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<Footer />
		</>
	);
}
