/** @format */

import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa"; // Import social media icons
import Image from "next/image"; // Import Image component from Next.js

const Footer = () => {
	return (
		<footer className="bg-gray-100 py-8 text-center">
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col items-center">
					<Image
						src="/logoMin.png"
						alt="alt"
						width={100}
						height={100}
						className="m-4"
					/>

					<div className="text-red-700 text-xl font-black">
						SARVODAYA ENGLISH HIGHER SECONDARY SCHOOL LAKHNADON
					</div>
				</div>
				<div className=" flex gap-4 justify-center mt-4">
					<a
						href="https://www.facebook.com/people/Sarvodaya-English-Higher-Secondary-School-Lakhnadon/61559633950802/"
						className="text-red-700 text-3xl mx-2 transition-colors duration-300 hover:text-blue-500"
					>
						<FaFacebook />
					</a>
					<a
						href="https://www.youtube.com/@sarvodayaschoollakhnadon"
						className="text-red-700 text-3xl mx-2 transition-colors duration-300 hover:text-blue-500"
					>
						<FaYoutube />
					</a>
				</div>
			</div>
			<div className="mt-6 text-gray-600 text-sm">
				&copy; {new Date().getFullYear()} Sarvodaya English Higher Secondary
				School Lakhnadon. All rights reserved.
				<h4>
					Designed and Developed by{" "}
					<a
						href="https://capmayank.github.io/portfolio"
						className="text-blue-500 hover:underline"
					>
						Mayank Vishwakarma
					</a>
				</h4>
			</div>
		</footer>
	);
};

export default Footer;
