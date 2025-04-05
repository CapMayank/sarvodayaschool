/** @format */
"use client";
import React, { useState, useMemo } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import Modal from "@/components/modals/modals";
import { motion } from "framer-motion";
import { Camera, ZoomIn } from "lucide-react";

type ImageData = {
	id: string;
	imageUrl: string;
	class: string;
};

type ImageGalleryProps = {
	title: string;
	images: ImageData[];
	filterFunction?: (image: ImageData) => boolean;
};

export default function GalleryPage({
	title,
	images,
	filterFunction = () => true,
}: ImageGalleryProps) {
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	const filteredImages = useMemo(() => {
		return images.filter(filterFunction);
	}, [images, filterFunction]);

	return (
		<>
			<Header title={title} />

			<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
				<div className="max-w-7xl mx-auto px-4">
					{/* Gallery Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<div className="flex items-center justify-center gap-2 mb-4">
							<Camera className="w-8 h-8 text-red-600" />
							<h2 className="text-4xl font-bold text-gray-900">
								{title} <span className="text-red-600">Gallery</span>
							</h2>
						</div>
						<div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-500 mx-auto rounded-full" />
					</motion.div>

					{/* Gallery Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
					>
						{filteredImages.map((image, index) => (
							<motion.div
								key={image.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="relative mb-4 group"
							>
								<div className="relative overflow-hidden rounded-xl shadow-md">
									<Image
										src={image.imageUrl}
										alt={image.class}
										width={500}
										height={500}
										className="w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
										priority={index < 4}
										loading={index >= 4 ? "lazy" : "eager"}
									/>

									{/* Overlay */}
									<div
										className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
										onClick={() => openModal(image.imageUrl)}
									>
										<button className="bg-white/90 p-3 rounded-full transform -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:text-white">
											<ZoomIn className="w-6 h-6" />
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>

			{/* Modal */}
			{showModal && selectedImage && (
				<Modal
					showModal={showModal}
					setShowModal={setShowModal}
					imageUrl={selectedImage}
				/>
			)}

			<Footer />
		</>
	);
}
