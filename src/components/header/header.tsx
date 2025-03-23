/** @format */
"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
	title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
	const location = usePathname();

	return (
		<section className="text-center my-8 p-8 ">
			<Image
				className="absolute inset-0 z-[-1] w-full h-[1024px] md:h-[500px] object-cover"
				src="/back.webp"
				alt="Sarvodaya School Students"
				width={2000}
				height={1333}
			></Image>
			<h2 className="heading-text-red text-2xl">
				Home / {location.split("/")[1]}
			</h2>
			<h1 className="heading-text-yellow text-center text-4xl md:text-6xl">
				{title}
			</h1>
		</section>
	);
};

export default Header;
