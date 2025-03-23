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
	];

	const youtubePlaylists = [
		{
			id: "PLLNvFiU5ntQcPwDj4MTRvEutCH3LKvskQ",
			title: "Annual Function 2025",
		},
		{
			id: "PLLNvFiU5ntQd5nwiHP3Y8F5WKM4ywa11-",
			title: "Republic Day 2025",
		},
		{
			id: "PLLNvFiU5ntQfF-TiwEFaRJvavJMZvC6FG",
			title: "Annual Function 2024",
		},
		{
			id: "PLLNvFiU5ntQchFtrbKA7b8RwSJOGcJWV2",
			title: "Annual Function 2023",
		},
	];

	return (
		<>
			<Header title="Gallery" />

			<div>
				{/* Image Gallery Section */}
				<div className="p-6 bg-white text-red-500 rounded-lg w-[90%] mx-auto mt-10  md:mt-20">
					<h2 className="text-3xl font-semibold text-center mb-4 heading-text-yellow">
						Image Gallery
					</h2>

					<div className="flex justify-center ">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							{placeholderImages.map((image) => (
								<div
									key={image.id}
									className="p-4 flex flex-col items-center backdrop-blur-sm bg-red-500 rounded-md shadow-xl hover:scale-105 transform transition duration-500 ease-in-out hover:shadow-2xl hover:bg-red-600"
								>
									<h5 className="text-lg text-white font-bold mb-2">
										{image.placeholder}
									</h5>
									<Link href={"/gallery/" + image.class}>
										<Image
											src={image.imageUrl}
											alt={image.class}
											width={500}
											height={500}
											className="rounded-sm"
										/>
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Video Playlist Section */}
				<div className="mt-5 p-6 bg-white text-red-500 rounded-lg w-[90%] mx-auto">
					<h2 className="text-3xl font-semibold text-center mb-6 heading-text-yellow">
						Video Playlists
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						{youtubePlaylists.map((playlist, index) => (
							<div
								key={index}
								className="flex flex-col items-center p-4 backdrop-blur-sm bg-red-500 rounded-md hover:scale-105 transform transition duration-500 ease-in-out hover:shadow-2xl hover:bg-red-600"
							>
								<h3 className="text-lg text-white font-bold mb-2">
									{playlist.title}
								</h3>
								<iframe
									src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}`}
									title={playlist.title}
									allowFullScreen
									className="w-full h-60 rounded-lg shadow-lg"
								></iframe>
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
