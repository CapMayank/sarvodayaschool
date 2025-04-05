/** @format */

import React from "react";
import Image from "next/image";
import Banner from "@/components/banner/banner";
import Link from "next/link";

const Hero = () => {
	const quickLinks = [
		{
			heading: "Teacher Recruitment for session 2025-26",
			link: "/careers",
			info: "Join our team for the next academic session.",
		},
		{
			heading: "Get Admission Now for session 2025-26",
			link: "/admission",
			info: "Secure your spot for the upcoming academic year.",
		},
		{
			heading: "Result for session 2024-25 is out now",
			link: "/result",
			info: "Check your results for annual examination.",
		},
	];

	return (
		<div className="flex  justify-center my-8 ">
			<Image
				className="absolute inset-0 z-[-1] w-full h-[1555px] md:h-[1555px] lg:h-full object-cover"
				src="/bg.webp"
				alt="School Building"
				width={2000}
				height={1333}
			></Image>
			{/* Dark Overlay */}
			<div className="absolute inset-0 z-[-1] h-[1555px] md:h-[1555px] lg:h-full bg-black/20"></div>

			<div className="w-[90%]  md:flex justify-center items-center sm:flex-col md:flex-row z-0">
				<div className=" md:w-[60%] ">
					<h1 className="heading-text-yellow text-4xl font-black sm:mb-2 md:mb-8">
						WELCOME TO SARVODAYA ENGLISH HIGHER SECONDARY SCHOOL
					</h1>
					<p className=" heading-text-red text-3xl md:text-6xl sm:mb-4 md:mb-8">
						Best Education & Discipline Expertise
					</p>
					<p className=" heading-text-white my-8 text-xl font-bold hidden md:block">
						Discipline is an essential component of education, as it helps
						students develop self-control, focus, and responsibility, which are
						crucial skills for achieving academic success and becoming lifelong
						learners.
					</p>
					<Link href="/admission">
						<button className="bg-red-500 text-white mt-4 mr-4 p-4 rounded-md md:w-60 hover:scale-110">
							Get Admission Now
						</button>
					</Link>

					<a href="https://www.google.com/maps/place/Sarvodaya+Higher+Secondary+School+Lakhnadon/@22.600395,79.6115581,17z/data=!3m1!4b1!4m6!3m5!1s0x398016e5aebf0369:0xd1749e600ccabbcf!8m2!3d22.600395!4d79.6141384!16s%2Fg%2F11bwjdj890?entry=ttu">
						<button className="bg-white text-red-500 mt-4 mr-4 p-4 rounded-md md:w-60 hover:scale-110">
							Visit Campus
						</button>
					</a>
				</div>
				<div className="flex justify-center md:w-[40%] mt-4 md:mt-0">
					{/* <div className="flex flex-col w-full mt-8 backdrop-blur-sm bg-white/30 p-4 rounded-md ">
						<h2 className="heading-text-yellow text-center text-2xl font-black mb-4">
							Quick Links
						</h2>
						<div className="flex flex-col items-center max-h-80 overflow-y-auto scrollbar-hide">
							{quickLinks.map((link, index) => (
								<a
									key={index}
									href={link.link}
									className="text-white my-2 w-full px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
								>
									<h3 className="font-semibold">{link.heading}</h3>
									<p className="text-sm">{link.info}</p>
								</a>
							))}
						</div>
					</div> */}

					<div className="flex flex-col w-full mt-8 backdrop-blur-md bg-white/30 p-4 rounded-xl shadow-lg border border-white/20">
						<h2 className="text-center text-3xl font-extrabold heading-text-yellow mb-6 tracking-wide uppercase">
							Quick Links
						</h2>

						<div className="flex flex-col items-center max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
							{quickLinks.map((link, index) => (
								<a
									key={index}
									href={link.link}
									className="w-full flex flex-col items-start p-2 my-1 bg-gradient-to-r from-red-600/100 to-red-500/10 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-red-800/80 hover:shadow-lg"
								>
									<h3 className="font-bold text-lg">{link.heading}</h3>
									<p className="hidden md:block text-sm opacity-90">
										{link.info}
									</p>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
