/** @format */

"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import achievements from "@/lib/achievement/achievements";

export default function AchievementsSection() {
	const scrollRef = useRef<HTMLDivElement>(null);

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

	return (
		<div className="relative w-full bg-gray-100 py-10">
			{/* Section Title */}
			<motion.h2
				className="text-5xl font-bold text-center heading-text-red mb-12 drop-shadow-lg"
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				Our Achievements
			</motion.h2>

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
		</div>
	);
}
