/** @format */
"use client";
import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Video, ChevronRight } from "lucide-react";

const Gallery = () => {
	const placeholderImages = [
		{
			id: 1,
			class: "Cultural_Programme",
			placeholder: "Cultural Programme",
			imageUrl: "/gallery/CulturalProgram/image8.jpg",
			description: "Annual cultural celebrations and performances",
		},
		{
			id: 2,
			class: "Stall",
			placeholder: "Stall",
			imageUrl: "/gallery/Stall/image1.jpg",
			description: "Exhibition stalls and presentations",
		},
		{
			id: 3,
			class: "Science_Exhibition",
			placeholder: "Science Exhibition",
			imageUrl: "/gallery/ScienceExhibition/image1.jpg",
			description: "Student science projects and innovations",
		},
		{
			id: 4,
			class: "Sports",
			placeholder: "Sports",
			imageUrl: "/gallery/Sports/image8.jpg",
			description: "Sports events and athletic achievements",
		},
		{
			id: 5,
			class: "Class_Activities",
			placeholder: "Class Activities",
			imageUrl: "/gallery/ClassActivities/image35.png",
			description: "Engaging class activities and projects",
		},
	];

	const youtubePlaylists = [
		{
			id: "PLLNvFiU5ntQdpRUCKAHbeLT9c2R-c8vl0",
			title: "Functions and Events 2025-26",
		},
		{
			id: "PLLNvFiU5ntQcPwDj4MTRvEutCH3LKvskQ",
			title: "Annual Function 2024-25",
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

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<>
			<Header title="Gallery" />

			<div className="max-w-7xl mx-auto px-4 py-12 bg-gray-100 md:bg-transparent mt-5">
				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
						Our School Gallery
					</h1>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Explore our vibrant collection of memories, achievements, and
						celebrations
					</p>
				</motion.div>

				{/* Image Gallery Section */}
				<section className="mb-20">
					<div className="flex items-center mb-8">
						<Camera className="w-6 h-6 text-red-600 mr-2" />
						<h2 className="text-2xl font-bold text-gray-800">
							Photo Collections
						</h2>
					</div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
					>
						{placeholderImages.map((image) => (
							<motion.div
								key={image.id}
								variants={itemVariants}
								className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								<Link href={"/gallery/" + image.class}>
									<div className="relative h-64 overflow-hidden">
										<Image
											src={image.imageUrl}
											alt={image.class}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
										<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
											<h3 className="text-lg font-semibold mb-1">
												{image.placeholder}
											</h3>
											<p className="text-sm text-white/80">
												{image.description}
											</p>
										</div>
										<div className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<ChevronRight className="w-4 h-4" />
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</motion.div>
				</section>

				{/* Video Playlists Section */}
				<section>
					<div className="flex items-center mb-8">
						<Video className="w-6 h-6 text-red-600 mr-2" />
						<h2 className="text-2xl font-bold text-gray-800">
							Video Highlights
						</h2>
					</div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
					>
						{youtubePlaylists.map((playlist, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
							>
								<div className="aspect-video">
									<iframe
										src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}`}
										title={playlist.title}
										allowFullScreen
										className="w-full h-full"
									></iframe>
								</div>
								<div className="p-4">
									<h3 className="text-lg font-semibold text-gray-800">
										{playlist.title}
									</h3>
								</div>
							</motion.div>
						))}
					</motion.div>
				</section>
			</div>

			<Footer />
		</>
	);
};

export default Gallery;
