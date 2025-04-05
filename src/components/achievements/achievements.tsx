/** @format */

"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import achievements from "@/lib/achievement/achievements";
import Modal from "@/components/modals/modals";

export default function AchievementsSection() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
		}
	};

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	return (
		<div className="relative w-full bg-gradient-to-b from-gray-50 to-white py-16 ">
			{/* Header */}
			<motion.div
				className="text-center mb-12"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="inline-flex items-center gap-2 mb-4">
					<Award className="text-red-600 w-8 h-8" />
					<h2 className="text-4xl font-bold text-gray-900">
						Our <span className="text-red-600">Achievements</span>
					</h2>
				</div>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Celebrating excellence and recognition in academics, sports, and
					co-curricular activities
				</p>
			</motion.div>

			{/* Carousel Container - Make it relative for positioning */}
			<div className="relative">
				{/* Scroll Buttons - Now positioned relative to carousel */}
				<button
					className="absolute left-4 top-[175px] transform z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
					onClick={scrollLeft}
					aria-label="Scroll left"
				>
					<ChevronLeft size={24} />
				</button>

				<button
					className="absolute right-4 top-[175px] transform z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
					onClick={scrollRight}
					aria-label="Scroll right"
				>
					<ChevronRight size={24} />
				</button>

				{/* Scrolling Achievements List */}
				<div
					ref={scrollRef}
					className="w-full flex space-x-6 px-8 py-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x relative z-10"
				>
					{achievements.map((achievement, index) => (
						<motion.div
							key={index}
							className="relative min-w-[300px] md:min-w-[400px] rounded-xl overflow-hidden shadow-lg cursor-pointer snap-center group"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							viewport={{ once: true }}
							// onClick={() => openModal(achievement.imageUrl)}
						>
							{/* Achievement Image */}
							<Image
								src={achievement.imageUrl}
								alt={achievement.title || "Achievement image"}
								width={400}
								height={250}
								className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
							/>

							{/* Overlay Info on Hover */}
							<div className="absolute bottom-0 left-0 w-full bg-red-500/30 backdrop-blur-sm text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<h3 className="text-xl font-semibold">{achievement.title}</h3>
								<p className="text-sm">{achievement.description}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Modal Component */}
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				imageUrl={selectedImage}
			/>
		</div>
	);
}
