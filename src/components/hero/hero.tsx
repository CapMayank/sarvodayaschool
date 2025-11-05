/** @format */

import React from "react";
import Image from "next/image";
import Banner from "@/components/banner/banner";
import Link from "next/link";

const Hero = () => {
	return (
		<div className="flex justify-center py-8 md:py-16 ">
			<Image
				className="absolute inset-0 z-[-1] w-full h-[180vh] xl:h-screen object-cover"
				src="/bg.jpg"
				alt="School Building"
				width={2000}
				height={1333}
				priority
			></Image>
			{/* Dark Overlay */}
			<div className="absolute inset-0 z-[-1] h-[180vh] xl:h-screen  bg-gradient-to-b from-transparent to-black/60"></div>
			<div className="absolute inset-0 z-[-1] h-[180vh] xl:h-screen bg-blue-600/5 "></div>

			{/* <div className="absolute inset-0 z-[-1] h-screen  bg-gradient-to-b from-black/30 to-transparent"></div> */}
			<div className="absolute inset-0 z-[-1] h-[180vh] xl:h-screen  bg-linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent)"></div>

			<div className="w-[90%]  md:flex items-center ">
				<div className=" md:w-[60%] h-full">
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
			</div>
		</div>
	);
};

export default Hero;
