/** @format */

import React from "react";
import Image from "next/image";

const Banner = () => {
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
				className=" grid grid-cols-2 md:grid-cols-4 p-4 md:p-8 text-white bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/banner.jpg')" }}
			>
				{bannerData.map((val, index) => (
					<div key={index} className="flex items-center justify-center">
						<div className="mr-2">
							{/* <img
								src={val.cover}
								alt=""
								className="w-50 md:w-150 rounded-lg"
							/> */}

							<div className="w-50 md:w-150">
								<Image
									src={val.cover}
									alt="Cover Image"
									width={80} // Fixed width for larger screens
									height={80} // Fixed height
									className="rounded-lg"
								/>
							</div>
						</div>
						<div className="w-1/2">
							<h1 className="md:text-2xl font-bold">{val.data}</h1>
							<h3 className="md:text-lg font-semibold">{val.title}</h3>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Banner;
