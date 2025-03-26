/** @format */

"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import facilities from "@/lib/facilities/facilities";

export default function FacilitiesSection() {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
				Our School Facilities
			</motion.h2>

			{/* Scroll Buttons */}
			<button
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition z-50"
				onClick={scrollLeft}
			>
				<ChevronLeft size={24} />
			</button>

			<button
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition z-50"
				onClick={scrollRight}
			>
				<ChevronRight size={24} />
			</button>

			{/* Scrolling Facilities List */}
			<div
				ref={scrollRef}
				className="w-full flex space-x-6 px-8 py-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x relative z-10"
			>
				{facilities.map((facility, index) => (
					<motion.div
						key={index}
						className="relative min-w-[300px] md:min-w-[400px] backdrop-blur-lg bg-red-500/30 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-all snap-center"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
						viewport={{ once: true }}
					>
						{/* Facility Image */}
						<Image
							src={facility.imageUrl}
							alt={facility.title}
							width={400}
							height={250}
							className="w-full h-72 object-cover rounded-lg"
						/>

						{/* Title & Description */}
						<h3 className="text-2xl font-semibold text-gray-800 mt-4">
							{facility.title}
						</h3>
						<p className="text-gray-600 mt-2">{facility.description}</p>
					</motion.div>
				))}
			</div>

			{/* Call to Action */}
			{/* <div className="flex justify-center mt-12">
				<motion.a
					href="/admission"
					className="px-8 py-4 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg transition duration-300 text-lg font-semibold"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					Explore Admissions
				</motion.a>
			</div> */}
		</div>
	);
}
