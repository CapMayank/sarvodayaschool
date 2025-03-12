/** @format */

import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Image from "next/image";

const About = () => {
	return (
		<>
			<Header title="About" />
			<div className="flex flex-col items-center justify-center max-w-4xl mx-auto p-10 mt-20 bg-white shadow-xl rounded-lg">
				<div className="text-center mb-10">
					<Image
						src="/logoMin.png"
						alt="School Logo"
						width={150}
						height={150}
						className="mx-auto"
					/>
					<h1 className="text-4xl font-extrabold text-red-600 mt-4">
						Welcome to Sarvodaya English Higher Secondary School, Lakhnadon
					</h1>
					<p className="text-gray-500 font-medium text-lg mt-2">
						Run by Vishwakarma Shiksha Prasar Samiti
					</p>
				</div>

				<div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg">
					<h2 className="text-3xl font-bold text-red-600 text-center mb-6">
						Why Choose Us?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-lg leading-relaxed">
						<div className="space-y-6">
							<p>
								🎓 <span className="font-semibold">Quality Education:</span> We
								are committed to delivering top-notch education to students from
								Lakhnadon and its neighboring regions.
							</p>
							<p>
								📖{" "}
								<span className="font-semibold">Comprehensive Curriculum:</span>{" "}
								Our expert educators design engaging coursework tailored to each
								student’s strengths.
							</p>
							<p>
								🏆 <span className="font-semibold">Holistic Development:</span>{" "}
								Our curriculum blends academics with extracurricular activities
								like music, art, drama, and sports.
							</p>
						</div>
						<div className="space-y-6">
							<p>
								🛡️ <span className="font-semibold">Safety First:</span> Student
								safety is our priority, backed by modern security measures and
								strict protocols.
							</p>
							<p>
								🏫 <span className="font-semibold">Advanced Facilities:</span>{" "}
								Smart classrooms, well-equipped labs, a library, and sports
								arenas enrich the learning experience.
							</p>
							<p>
								🌍 <span className="font-semibold">Equal Opportunities:</span>{" "}
								We believe in accessible education for all, ensuring every
								student thrives regardless of their background.
							</p>
						</div>
					</div>
					<p className="text-center text-gray-600 mt-8 text-lg">
						We appreciate your interest in our institution and look forward to
						welcoming you into our thriving school community.
					</p>
				</div>
			</div>

			{/* Director Section */}
			<div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto mt-4 mb-4 p-10 bg-white shadow-xl rounded-lg">
				<Image
					src="/director.png"
					alt="Dr. Mangal Vishwakarma"
					width={220}
					height={220}
					className="rounded-full shadow-lg"
				/>
				<div className="text-center mt-2 md:text-left md:ml-8">
					<h2 className="text-3xl font-bold heading-text-yellow">Director</h2>
					<h2 className="text-3xl font-bold text-red-700">
						Dr. Mangal Vishwakarma
					</h2>
					<p className="text-gray-600 font-medium text-lg">
						PhD, M.Phil, M.Com, B.Ed
					</p>
					<p className="text-gray-700 mt-4 text-lg italic">
						&quot;At Sarvodaya English Higher Secondary School, we believe that
						education and discipline are the foundation of success. Our mission
						is to nurture young minds with knowledge, integrity, and a strong
						sense of responsibility. Through a disciplined learning environment,
						we strive to shape students into confident, capable individuals
						ready to excel in academics and life.&quot;
					</p>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default About;
