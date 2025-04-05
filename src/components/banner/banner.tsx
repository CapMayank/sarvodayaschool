/** @format */
"use client";
import React from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedNumber = ({ value }: { value: string }) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const [ref, inView] = useInView({ triggerOnce: true });

	React.useEffect(() => {
		if (inView) {
			const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
			const animation = animate(count, numericValue, {
				duration: 2,
				ease: "easeOut",
			});
			return animation.stop;
		}
	}, [count, value, inView]);

	return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Banner = () => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const bannerData = [
		{
			cover:
				"https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/80/ffffff/external-graduation-education-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png",
			data: "850+",
			title: "STUDENTS",
		},

		{
			cover: "https://img.icons8.com/ios/80/ffffff/athlete.png",
			data: "30+",
			title: "TRAINED TEACHER",
		},
		{
			cover:
				"https://img.icons8.com/external-outline-icons-maxicons/80/ffffff/external-calender-insurance-outline-outline-icons-maxicons.png",
			data: "100%",
			title: "RESULT",
		},
		{
			cover: "https://img.icons8.com/ios/80/ffffff/macbook-idea--v3.png",
			data: "STREAMS",
			title: "SCIENCE & COMMERCE",
		},
	];

	return (
		<>
			<div
				ref={ref}
				className="grid grid-cols-2 md:grid-cols-4 p-4 md:p-8 text-white bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/banner.jpg')" }}
			>
				{bannerData.map((val, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, delay: index * 0.2 }}
						className="flex items-center justify-center"
					>
						<div className="mr-2">
							<div className="w-50 md:w-150">
								<Image
									src={val.cover}
									alt="Cover Image"
									width={80}
									height={80}
									className="rounded-lg"
								/>
							</div>
						</div>
						<div className="w-1/2">
							<h1 className="md:text-2xl font-bold">
								{val.data.includes("+") ? (
									<>
										<AnimatedNumber value={val.data} />+
									</>
								) : (
									val.data
								)}
							</h1>
							<h3 className="md:text-lg font-semibold">{val.title}</h3>
						</div>
					</motion.div>
				))}
			</div>
		</>
	);
};

export default Banner;
