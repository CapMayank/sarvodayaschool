/** @format */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex flex-col justify-center my-6 md:mb-8">
			<div className="flex items-center max-sm:flex-col md:ml-12 md:mx-4 md:flex-row xl:ml-16 xl:mx-8 text-center justify-center">
				<div className="p-1 mr-4">
					<Link href="/">
						<Image
							src="/logoMin.png"
							alt="Sarvodaya Higher Secondary School Logo"
							width={100}
							height={100}
						/>
					</Link>
				</div>
				<div className="flex justify-between md:flex-row flex-col px-8 items-center ">
					<div>
						<Link href="/">
							<h1 className="heading-text-red font-black text-[30px] text-center md:text-start">
								SARVODAYA ENGLISH HIGHER SECONDARY SCHOOL LAKHNADON{" "}
							</h1>
							<h3 className="heading-text-yellow font-black text-center md:text-start">
								A Commitment to Best Education and Discipline for a Better World
							</h3>
						</Link>
					</div>
					<div className="heading-text-red font-black flex gap-3 ml-10 md:mb-10 justify-between m-4 items-center ">
						<a
							href="https://www.youtube.com/@sarvodayaschoollakhnadon"
							className="hover:text-red-800"
						>
							<FontAwesomeIcon icon={faYoutube} size="2x" />
						</a>
						<a
							href="https://www.facebook.com/people/Sarvodaya-English-Higher-Secondary-School-Lakhnadon/61559633950802/"
							className="hover:text-red-800"
						>
							<FontAwesomeIcon icon={faFacebook} size="2x" />
						</a>
					</div>
				</div>
				<div className=" flex justify-between p-4 w-full bg-red-500 text-white md:hidden ">
					<a href="/admission">Get Admission</a>
					<div className="justify-end items-center text-white md:hidden">
						<button onClick={toggleMenu}>
							<FontAwesomeIcon icon={faBars} size="1x" />
						</button>
					</div>
				</div>
			</div>
			<div
				className={`flex flex-col text-xl heading-text-yellow  font-bold items-center backdrop-blur-sm bg-red-500/10 md:hidden ${
					isOpen ? "" : "hidden"
				}`}
			>
				<a href="/" className="text-white my-2">
					Home
				</a>
				<a href="/admission" className="text-white my-2">
					Admission
				</a>
				<a href="/result" className="text-white my-2">
					Result
				</a>
				<a href="/careers" className="text-white my-2">
					Careers
				</a>
				<a href="/gallery" className="text-white my-2">
					Gallery
				</a>
				<a href="/about" className="text-white my-2">
					About
				</a>
			</div>
			<div className="flex justify-center">
				<div className="flex w-[90%] justify-between backdrop-blur-sm bg-red-500/10 ">
					<div className="p-6 text-xl heading-text-yellow  font-bold justify-center gap-10 hidden md:flex">
						<a href="/" className="ml-4 text-white hover:text-yellow-300">
							Home
						</a>
						<a
							href="/admission"
							className="ml-4 text-white hover:text-yellow-300"
						>
							Admission
						</a>
						<a href="/result" className="ml-4 text-white hover:text-yellow-300">
							Result
						</a>
						<a
							href="/careers"
							className="ml-4 text-white hover:text-yellow-300"
						>
							Careers
						</a>
						<a
							href="/gallery"
							className="ml-4 text-white hover:text-yellow-300"
						>
							Gallery
						</a>
						<a href="/about" className="ml-4 text-white hover:text-yellow-300">
							About
						</a>
					</div>
					<div
						className="p-6 text-white font-black bg-red-500 hidden md:block hover:scale-110 cursor-pointer"
						style={{ clipPath: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)" }}
					>
						<a href="/admission">Get Admission</a>
					</div>
				</div>
			</div>
			<Link href="/careers">
				<div className="flex justify-center md:my-1">
					{" "}
					<div className=" marquee p-2 text-red-600 text-2xl font-sans font-black flex md:w-[90%] justify-between backdrop-blur-sm  bg-white/30">
						<div className="marquee-content">
							Teacher Requirement 2025-26 Subject-
							Maths/Bio/Physics/Chemistry/Sanskrit/Sociology/Commerce/Hindi/English
							| From Class 6th to 12th | Starting Salary From Rs. 20000/- to Rs.
							25000/- |Contact:+91 8989646850
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
