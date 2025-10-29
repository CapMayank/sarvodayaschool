/** @format */

"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Video, ChevronRight } from "lucide-react";
import { CategoryGridSkeleton } from "@/components/LoadingSkeleton";

// Define categories statically - loads instantly
const staticCategories = [
	{
		name: "Cultural_Programme",
		title: "Cultural Programme",
		description: "Annual cultural celebrations and performances",
	},
	{
		name: "Stall",
		title: "Stall",
		description: "Exhibition stalls and presentations",
	},
	{
		name: "Science_Exhibition",
		title: "Science Exhibition",
		description: "Student science projects and innovations",
	},
	{
		name: "Sports",
		title: "Sports",
		description: "Sports events and athletic achievements",
	},
	{
		name: "Class_Activities",
		title: "Class Activities",
		description: "Engaging class activities and projects",
	},
];

const Gallery = () => {
	const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
	const [loadingThumbnails, setLoadingThumbnails] = useState(true);

	// Fetch thumbnails in background after page loads
	useEffect(() => {
		fetch("/api/gallery/thumbnails")
			.then((res) => res.json())
			.then((data) => {
				setThumbnails(data.thumbnails || {});
				setLoadingThumbnails(false);
			})
			.catch((error) => {
				console.error("Error fetching thumbnails:", error);
				setLoadingThumbnails(false);
			});
	}, []);

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

				<section className="mb-20">
					<div className="flex items-center mb-8">
						<Camera className="w-6 h-6 text-red-600 mr-2" />
						<h2 className="text-2xl font-bold text-gray-800">
							Photo Collections
						</h2>
					</div>

					{loadingThumbnails ? (
						<CategoryGridSkeleton />
					) : (
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
						>
							{staticCategories.map((category) => (
								<motion.div
									key={category.name}
									variants={itemVariants}
									className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
								>
									<Link href={`/gallery/${category.name}`}>
										<div className="relative h-64 overflow-hidden">
											{thumbnails[category.name] ? (
												<CldImage
													src={thumbnails[category.name]}
													alt={category.title}
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
													className="object-cover group-hover:scale-110 transition-transform duration-500"
												/>
											) : (
												<div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
													<Camera className="w-16 h-16 text-red-600 opacity-50" />
												</div>
											)}
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
											<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
												<h3 className="text-lg font-semibold mb-1">
													{category.title}
												</h3>
												<p className="text-sm text-white/80">
													{category.description}
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
					)}
				</section>

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
