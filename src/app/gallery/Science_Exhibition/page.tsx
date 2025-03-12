/** @format */
"use client";
import React, { useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import Modal from "@/components/modals/modals";

export default function ScienceGallery() {
	const images = [
		//Cultural Programme
		{
			id: 1,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image1.jpg",
		},
		{
			id: 2,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image2.jpg",
		},
		{
			id: 3,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image3.jpg",
		},
		{
			id: 4,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image4.jpg",
		},
		{
			id: 5,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image5.jpg",
		},
		{
			id: 6,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image6.jpg",
		},
		{
			id: 7,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image7.jpg",
		},
		{
			id: 8,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image8.jpg",
		},
		{
			id: 9,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image9.jpg",
		},
		{
			id: 10,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image10.jpg",
		},
		{
			id: 11,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image11.jpg",
		},
		{
			id: 12,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image12.jpg",
		},
		{
			id: 13,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image13.jpg",
		},
		{
			id: 14,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image14.jpg",
		},
		{
			id: 15,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image15.jpg",
		},
		{
			id: 16,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image16.jpg",
		},
		{
			id: 17,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image17.jpg",
		},
		{
			id: 18,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image18.jpg",
		},
		{
			id: 19,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image19.jpg",
		},
		{
			id: 20,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image20.jpg",
		},
		{
			id: 21,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image21.jpg",
		},
		{
			id: 22,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image22.jpg",
		},
		{
			id: 23,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image23.jpg",
		},
		{
			id: 24,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image24.jpg",
		},
		{
			id: 25,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image25.jpg",
		},
		{
			id: 26,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image26.jpg",
		},
		{
			id: 27,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image27.jpg",
		},
		{
			id: 28,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image28.jpg",
		},
		{
			id: 29,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image29.jpg",
		},
		{
			id: 30,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image30.jpg",
		},
		{
			id: 31,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image31.jpg",
		},
		{
			id: 32,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image32.jpg",
		},
		{
			id: 33,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image33.jpg",
		},
		{
			id: 34,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image34.jpg",
		},
		{
			id: 35,
			class: "Cultural_Programme",
			imageUrl: "/gallery/CulturalProgram/image35.jpg",
		},

		//Stall

		{ id: 36, class: "Stall", imageUrl: "/gallery/Stall/image1.jpg" },
		{ id: 37, class: "Stall", imageUrl: "/gallery/Stall/image2.jpg" },
		{ id: 38, class: "Stall", imageUrl: "/gallery/Stall/image3.jpg" },
		{ id: 39, class: "Stall", imageUrl: "/gallery/Stall/image4.jpg" },
		{ id: 40, class: "Stall", imageUrl: "/gallery/Stall/image5.jpg" },
		{ id: 41, class: "Stall", imageUrl: "/gallery/Stall/image6.jpg" },
		{ id: 42, class: "Stall", imageUrl: "/gallery/Stall/image7.jpg" },
		{ id: 43, class: "Stall", imageUrl: "/gallery/Stall/image8.jpg" },
		{ id: 44, class: "Stall", imageUrl: "/gallery/Stall/image9.jpg" },
		{ id: 45, class: "Stall", imageUrl: "/gallery/Stall/image10.jpg" },
		{ id: 46, class: "Stall", imageUrl: "/gallery/Stall/image11.jpg" },
		{ id: 47, class: "Stall", imageUrl: "/gallery/Stall/image12.jpg" },
		{ id: 48, class: "Stall", imageUrl: "/gallery/Stall/image13.jpg" },
		{ id: 49, class: "Stall", imageUrl: "/gallery/Stall/image14.jpg" },
		{ id: 50, class: "Stall", imageUrl: "/gallery/Stall/image15.jpg" },
		{ id: 51, class: "Stall", imageUrl: "/gallery/Stall/image16.jpg" },
		{ id: 52, class: "Stall", imageUrl: "/gallery/Stall/image17.jpg" },
		{ id: 53, class: "Stall", imageUrl: "/gallery/Stall/image18.jpg" },
		{ id: 54, class: "Stall", imageUrl: "/gallery/Stall/image19.jpg" },

		//Science Exhibition

		{
			id: 55,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image1.jpg",
		},
		{
			id: 56,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image2.jpg",
		},
		{
			id: 57,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image3.jpg",
		},
		{
			id: 58,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image4.jpg",
		},
		{
			id: 59,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image5.jpg",
		},
		{
			id: 60,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image6.jpg",
		},
		{
			id: 61,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image7.jpg",
		},
		{
			id: 62,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image8.jpg",
		},
		{
			id: 63,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image9.jpg",
		},
		{
			id: 64,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image10.jpg",
		},
		{
			id: 65,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image11.jpg",
		},
		{
			id: 66,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image12.jpg",
		},
		{
			id: 67,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image13.jpg",
		},
		{
			id: 68,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image14.jpg",
		},
		{
			id: 69,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image15.jpg",
		},
		{
			id: 70,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image16.jpg",
		},
		{
			id: 71,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image17.jpg",
		},
		{
			id: 72,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image18.jpg",
		},
		{
			id: 73,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image19.jpg",
		},
		{
			id: 74,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image20.jpg",
		},
		{
			id: 75,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image21.jpg",
		},
		{
			id: 76,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image22.jpg",
		},
		{
			id: 77,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image23.jpg",
		},
		{
			id: 78,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image24.jpg",
		},
		{
			id: 79,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image25.jpg",
		},
		{
			id: 80,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image26.jpg",
		},
		{
			id: 81,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image27.jpg",
		},
		{
			id: 82,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image28.jpg",
		},
		{
			id: 83,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image29.jpg",
		},
		{
			id: 84,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image30.jpg",
		},
		{
			id: 85,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image31.jpg",
		},
		{
			id: 86,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image32.jpg",
		},
		{
			id: 87,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image33.jpg",
		},
		{
			id: 88,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image34.jpg",
		},
		{
			id: 89,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image35.jpg",
		},
		{
			id: 90,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image36.jpg",
		},
		{
			id: 91,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image37.jpg",
		},
		{
			id: 92,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image38.jpg",
		},
		{
			id: 93,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image39.jpg",
		},
		{
			id: 94,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image40.jpg",
		},
		{
			id: 95,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image41.jpg",
		},
		{
			id: 96,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image42.jpg",
		},
		{
			id: 97,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image43.jpg",
		},
		{
			id: 98,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image44.jpg",
		},
		{
			id: 99,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image45.jpg",
		},
		{
			id: 100,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image46.jpg",
		},
		{
			id: 101,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image47.jpg",
		},
		{
			id: 102,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image48.jpg",
		},
		{
			id: 103,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image49.jpg",
		},
		{
			id: 104,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image50.jpg",
		},
		{
			id: 105,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image51.jpg",
		},
		{
			id: 106,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image52.jpg",
		},
		{
			id: 107,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image53.jpg",
		},
		{
			id: 108,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image54.jpg",
		},
		{
			id: 109,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image55.jpg",
		},
		{
			id: 110,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image56.jpg",
		},
		{
			id: 111,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image57.jpg",
		},
		{
			id: 112,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image58.jpg",
		},
		{
			id: 113,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image59.jpg",
		},
		{
			id: 114,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image60.jpg",
		},
		{
			id: 115,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image61.jpg",
		},
		{
			id: 116,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image62.jpg",
		},
		{
			id: 117,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image63.jpg",
		},
		{
			id: 118,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image64.jpg",
		},
		{
			id: 119,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image65.jpg",
		},
		{
			id: 120,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image66.jpg",
		},
		{
			id: 121,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image67.jpg",
		},
		{
			id: 122,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image68.jpg",
		},
		{
			id: 123,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image69.jpg",
		},
		{
			id: 124,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image70.jpg",
		},
		{
			id: 125,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image71.jpg",
		},
		{
			id: 126,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image72.jpg",
		},
		{
			id: 127,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image73.jpg",
		},
		{
			id: 128,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image74.jpg",
		},
		{
			id: 129,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image75.jpg",
		},
		{
			id: 130,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image76.jpg",
		},
		{
			id: 131,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image77.jpg",
		},
		{
			id: 132,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image78.jpg",
		},
		{
			id: 133,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image79.jpg",
		},
		{
			id: 134,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image80.jpg",
		},
		{
			id: 135,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image81.jpg",
		},
		{
			id: 136,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image82.jpg",
		},
		{
			id: 137,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image83.jpg",
		},
		{
			id: 138,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image84.jpg",
		},
		{
			id: 139,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image85.jpg",
		},
		{
			id: 140,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image86.jpg",
		},
		{
			id: 141,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image87.jpg",
		},
		{
			id: 142,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image88.jpg",
		},
		{
			id: 143,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image89.jpg",
		},
		{
			id: 144,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image90.jpg",
		},
		{
			id: 145,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image91.jpg",
		},
		{
			id: 146,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image92.jpg",
		},
		{
			id: 147,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image93.jpg",
		},
		{
			id: 148,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image94.jpg",
		},
		{
			id: 149,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image95.jpg",
		},
		{
			id: 150,
			class: "Science_Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image96.jpg",
		},

		//Sports

		{ id: 151, class: "Sports", imageUrl: "/gallery/Sports/image1.jpg" },
		{ id: 152, class: "Sports", imageUrl: "/gallery/Sports/image2.jpg" },
		{ id: 153, class: "Sports", imageUrl: "/gallery/Sports/image3.jpg" },
		{ id: 154, class: "Sports", imageUrl: "/gallery/Sports/image4.jpg" },
		{ id: 155, class: "Sports", imageUrl: "/gallery/Sports/image5.jpg" },
		{ id: 156, class: "Sports", imageUrl: "/gallery/Sports/image6.jpg" },
		{ id: 157, class: "Sports", imageUrl: "/gallery/Sports/image7.jpg" },
		{ id: 158, class: "Sports", imageUrl: "/gallery/Sports/image8.jpg" },
		{ id: 159, class: "Sports", imageUrl: "/gallery/Sports/image9.jpg" },
		{ id: 160, class: "Sports", imageUrl: "/gallery/Sports/image10.jpg" },
		{ id: 161, class: "Sports", imageUrl: "/gallery/Sports/image11.jpg" },
		{ id: 162, class: "Sports", imageUrl: "/gallery/Sports/image12.jpg" },
		{ id: 163, class: "Sports", imageUrl: "/gallery/Sports/image13.jpg" },
		{ id: 164, class: "Sports", imageUrl: "/gallery/Sports/image14.jpg" },
		{ id: 165, class: "Sports", imageUrl: "/gallery/Sports/image15.jpg" },
		{ id: 166, class: "Sports", imageUrl: "/gallery/Sports/image16.jpg" },
		{ id: 167, class: "Sports", imageUrl: "/gallery/Sports/image17.jpg" },
		{ id: 168, class: "Sports", imageUrl: "/gallery/Sports/image18.jpg" },
		{ id: 169, class: "Sports", imageUrl: "/gallery/Sports/image19.jpg" },
		{ id: 170, class: "Sports", imageUrl: "/gallery/Sports/image20.jpg" },
		{ id: 171, class: "Sports", imageUrl: "/gallery/Sports/image21.jpg" },
		{ id: 172, class: "Sports", imageUrl: "/gallery/Sports/image22.jpg" },
		{ id: 173, class: "Sports", imageUrl: "/gallery/Sports/image23.jpg" },
		{ id: 174, class: "Sports", imageUrl: "/gallery/Sports/image24.jpg" },
		{ id: 175, class: "Sports", imageUrl: "/gallery/Sports/image25.jpg" },
		{ id: 176, class: "Sports", imageUrl: "/gallery/Sports/image26.jpg" },
		{ id: 177, class: "Sports", imageUrl: "/gallery/Sports/image27.jpg" },
		{ id: 178, class: "Sports", imageUrl: "/gallery/Sports/image28.jpg" },
		{ id: 179, class: "Sports", imageUrl: "/gallery/Sports/image29.jpg" },
		{ id: 180, class: "Sports", imageUrl: "/gallery/Sports/image30.jpg" },
		{ id: 181, class: "Sports", imageUrl: "/gallery/Sports/image31.jpg" },
	];

	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	return (
		<>
			<Header title={"Science Exhibition"} />

			<div>
				<div className="flex justify-center md:m-4 md:my-20">
					<div className="grid grid-cols-1 md:grid-cols-4 md:w-[90%] gap-4 justify-center">
						{images
							.filter((image) => image.class === "Science_Exhibition")
							.map((image) => (
								<div
									key={image.id}
									className="p-4 flex flex-col backdrop-blur-sm bg-red-500/80 rounded-md hover:scale-105 transform transition duration-500 ease-in-out hover:shadow-2xl hover:bg-red-500/90 cursor-pointer"
									onClick={() => openModal(image.imageUrl)}
								>
									<Image
										src={image.imageUrl}
										alt={image.class}
										width={500}
										height={500}
										className="rounded-sm"
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
