/** @format */
"use client";
import React, { useState, useMemo } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import Modal from "@/components/modals/modals";
import cultural from "@/lib/images/cultural";

export default function CulturalGallery() {
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	const culturalImages = useMemo(() => {
		return cultural.filter((image) => image.class === "Cultural_Programme");
	}, []);

	return (
		<>
			<Header title={"Cultural Programme"} />

			<div>
				<div className="flex justify-center md:m-4 md:my-20">
					<div className="columns-1 md:columns-4 gap-4 w-[90%]">
						{culturalImages.map((image, index) => (
							<div
								key={image.id}
								className="mb-4 backdrop-blur-sm bg-red-500/80 rounded-md hover:scale-105 transform transition duration-500 ease-in-out hover:shadow-2xl hover:bg-red-500/90 cursor-pointer break-inside-avoid"
								onClick={() => openModal(image.imageUrl)}
							>
								<Image
									src={image.imageUrl}
									alt={image.class}
									width={500}
									height={500}
									className="rounded-sm object-cover w-full"
									priority={index < 4} // Prioritize the first 4 images
									loading={index >= 4 ? "lazy" : "eager"} // Lazy load other images
								/>
							</div>
						))}
					</div>
				</div>
			</div>

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
