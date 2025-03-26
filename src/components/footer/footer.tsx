/** @format */

import React from "react";
import {
	FaFacebook,
	FaYoutube,
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bg-gray-100 py-8 text-center">
			<div className="max-w-5xl mx-auto px-4">
				{/* Logo and School Name */}
				<div className="flex flex-col items-center">
					<Image
						src="/logoMin.png"
						alt="School Logo"
						width={100}
						height={100}
						className="m-4"
					/>
					<div className="text-red-700 text-xl font-black text-center">
						SARVODAYA ENGLISH HIGHER SECONDARY SCHOOL LAKHNADON
					</div>
				</div>

				{/* Contact Information */}
				<div className="mt-6 text-gray-700 text-sm">
					<div className="flex flex-col items-center space-y-2">
						<p className="flex items-center gap-2">
							<FaMapMarkerAlt className="text-red-700" />
							<a
								href="https://www.google.com/maps/place/Sarvodaya+Higher+Secondary+School+Lakhnadon/@22.600395,79.6115581,17z/data=!3m1!4b1!4m6!3m5!1s0x398016e5aebf0369:0xd1749e600ccabbcf!8m2!3d22.600395!4d79.6141384!16s%2Fg%2F11bwjdj890?entry=ttu"
								className="hover:text-blue-500"
								target="_blank"
								rel="noopener noreferrer"
							>
								Lakhnadon, Seoni, Madhya Pradesh, India
							</a>
						</p>
						<p className="flex items-center gap-2">
							<FaPhone className="text-red-700" />
							<a href="tel:+918989646850" className="hover:text-blue-500">
								+91 89896 46850
							</a>
						</p>
						<p className="flex items-center gap-2">
							<FaEnvelope className="text-red-700" />
							<a
								href="mailto:info@sarvodayaschool.co.in"
								className="hover:text-blue-500"
							>
								sarvodaya816@gmail.com
							</a>
						</p>
					</div>
				</div>

				{/* Social Media Links */}
				<div className="flex justify-center gap-4 mt-6">
					<a
						href="https://www.facebook.com/people/Sarvodaya-English-Higher-Secondary-School-Lakhnadon/61559633950802/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-red-700 text-3xl transition-colors duration-300 hover:text-blue-500"
					>
						<FaFacebook />
					</a>
					<a
						href="https://www.youtube.com/@sarvodayaschoollakhnadon"
						target="_blank"
						rel="noopener noreferrer"
						className="text-red-700 text-3xl transition-colors duration-300 hover:text-red-600"
					>
						<FaYoutube />
					</a>
				</div>

				{/* Copyright and Developer Info */}
				<div className="mt-6 text-gray-600 text-sm">
					&copy; {new Date().getFullYear()} Sarvodaya English Higher Secondary
					School Lakhnadon. All rights reserved.
					<h4>
						Designed and Developed by{" "}
						<a
							href="https://capmayank.github.io/portfolio"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:underline"
						>
							Mayank Vishwakarma
						</a>
					</h4>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
