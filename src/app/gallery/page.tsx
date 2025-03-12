/** @format */

import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import Link from "next/link";

const Gallery = () => {
	const placeholderImages = [
		{
			id: 1,
			class: "Cultural_Programme",
			placeholder: "Cultural Programme",
			imageUrl: "/gallery/CulturalProgram/image8.jpg",
		},
		{
			id: 2,
			class: "Stall",
			placeholder: "Stall",
			imageUrl: "/gallery/Stall/image1.jpg",
		},
		{
			id: 3,
			class: "Science_Exhibition",
			placeholder: "Science Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image1.jpg",
		},
		{
			id: 4,
			class: "Sports",
			placeholder: "Sports",
			imageUrl: "/gallery/Sports/image8.jpg",
		},
		// Add more placeholder images as needed
	];
	return (
		<>
			<Header title="Gallery" />

			<div>
				<div className=" flex justify-center md:m-4 md:my-20  ">
					<div className="flex flex-col md:flex-row md:w-[90%] gap-4  justify-center">
						{placeholderImages.map((image) => (
							<div
								key={image.id}
								className="p-4 flex flex-col backdrop-blur-sm bg-red-500/80 rounded-md hover:scale-105 transform transition duration-500 ease-in-out hover:shadow-2xl hover:bg-red-500/90"
							>
								<Link href={"/gallery/" + image.class}>
									<Image
										src={image.imageUrl}
										alt={image.class}
										width={500}
										height={500}
										className="rounded-sm"
									/>
									<div className=" text-center p-2 rounded-lg m-2">
										<h5 className="text-white text-2xl">{image.placeholder}</h5>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Gallery;
