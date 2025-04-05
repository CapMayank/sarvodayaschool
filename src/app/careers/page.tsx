/** @format */
"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Modal from "@/components/modals/modals";
import Image from "next/image";
import { motion } from "framer-motion";
import {
	Briefcase,
	GraduationCap,
	Clock,
	MapPin,
	Book,
	Users,
	Send,
} from "lucide-react";

const districts: { [key: string]: string[] } = {
	Seoni: [
		"Lakhnadon",
		"Seoni",
		"Ghansor",
		"Keolari",
		"Barghat",
		"Kurai",
		"Dhanora",
	],
	Jabalpur: [
		"Jabalpur",
		"Shahpura",
		"Panagar",
		"Sihora",
		"Majholi",
		"Kundam",
		"Patan",
	],
	Narsinghpur: ["Narsinghpur", "Gadarwara", "Tendukheda", "Kareli", "Gotegaon"],
	Mandla: ["Mandla", "Bichhiya", "Ghughri", "Nainpur", "Niwas"],
	Balaghat: [
		"Balaghat",
		"Baihar",
		"Katangi",
		"Lanji",
		"Waraseoni",
		"Khairlanji",
	],
	Chhindwara: [
		"Chhindwara",
		"Parasia",
		"Sausar",
		"Pandhurna",
		"Mohan Nagar",
		"Amarwara",
	],
	Betul: ["Betul", "Multai", "Amla", "Sarni", "Bhainsdehi"],
	Narmadapuram: [
		"Narmadapuram",
		"Itarsi",
		"Pipariya",
		"Seoni Malwa",
		"Sohagpur",
	],
	Raisen: [
		"Raisen",
		"Begamganj",
		"Goharganj",
		"Obedullaganj",
		"Silwani",
		"Udaipura",
	],
};

const Careers: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		gender: "",
		mobileNumber: "",
		address: "",
		district: "",
		block: "",
		qualifications: "",
		specialization: "",
		professionalQualification: "",
		otherProfessionalQualification: "",
		subject: "",
		class: "",
		experience: "",
		captchaToken: "",
	});

	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		if (name === "district") {
			setFormData({ ...formData, district: value, block: "" });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleCaptchaChange = (value: string | null) => {
		if (value) {
			setFormData((prev) => ({ ...prev, captchaToken: value }));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formData.captchaToken) {
			alert("Please complete the CAPTCHA verification");
			return;
		}

		const message = `
Name: ${formData.name}
Gender: ${formData.gender}
Mobile Number: ${formData.mobileNumber}
Educational Qualification: ${formData.qualifications} (${
			formData.specialization
		})
Professional Qualification: ${formData.professionalQualification}${
			formData.otherProfessionalQualification
				? ` (${formData.otherProfessionalQualification})`
				: ""
		}
Subject: ${formData.subject}
Class: ${formData.class}
Experience: ${formData.experience} years
Address: ${formData.address}
District: ${formData.district}
Block: ${formData.block}
`;

		const encodedMessage = encodeURIComponent(message);
		const whatsappURL = `https://wa.me/918989646850?text=${encodedMessage}`;
		window.open(whatsappURL, "_blank")?.focus();
	};

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	return (
		<>
			<Header title="Careers" />

			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Job Information Card */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-white rounded-xl shadow-lg overflow-hidden"
					>
						<div className="p-6">
							<h2 className="text-2xl font-bold text-gray-800 mb-6">
								Position Requirements
							</h2>
							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<div className="bg-red-100 p-3 rounded-full">
										<Book className="h-6 w-6 text-red-500" />
									</div>
									<div>
										<h3 className="font-semibold text-gray-800">
											Subjects Required
										</h3>
										<p className="text-gray-600">
											English, Mathematics, Biology, Physics, Chemistry, Social
											Science, Hindi, Sanskrit
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<div className="bg-red-100 p-3 rounded-full">
										<GraduationCap className="h-6 w-6 text-red-500" />
									</div>
									<div>
										<h3 className="font-semibold text-gray-800">
											Qualifications
										</h3>
										<p className="text-gray-600">
											Bachelor&apos;s Degree with B.Ed or equivalent
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<div className="bg-red-100 p-3 rounded-full">
										<Clock className="h-6 w-6 text-red-500" />
									</div>
									<div>
										<h3 className="font-semibold text-gray-800">Experience</h3>
										<p className="text-gray-600">
											Minimum 2 years of teaching experience
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<div className="bg-red-100 p-3 rounded-full">
										<Users className="h-6 w-6 text-red-500" />
									</div>
									<div>
										<h3 className="font-semibold text-gray-800">
											Salary Range
										</h3>
										<p className="text-gray-600">₹15,000 - ₹25,000 per month</p>
									</div>
								</div>
							</div>

							<Image
								src="/recruitment.png"
								alt="Teacher Recruitment Poster"
								width={700}
								height={300}
								className="rounded-lg shadow-md mt-6 cursor-pointer transform hover:scale-105 transition-transform duration-300"
								onClick={() => openModal("/recruitment.png")}
							/>
						</div>
					</motion.div>

					{/* Application Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-white rounded-xl shadow-lg overflow-hidden"
					>
						<div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6">
							<h2 className="text-2xl font-bold text-white flex items-center">
								<Briefcase className="mr-2" />
								Application Form
							</h2>
							<p className="text-white/80 mt-2">
								Fill in your details to apply
							</p>
						</div>

						<div className="p-6">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Personal Information */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Full Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Gender <span className="text-red-500">*</span>
										</label>
										<select
											name="gender"
											value={formData.gender}
											onChange={handleChange}
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											required
										>
											<option value="">Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Mobile Number <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											name="mobileNumber"
											value={formData.mobileNumber}
											onChange={handleChange}
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Subject <span className="text-red-500">*</span>
										</label>
										<select
											name="subject"
											value={formData.subject}
											onChange={handleChange}
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											required
										>
											<option value="">Select Subject</option>
											<option value="Mathematics">Mathematics</option>
											<option value="Physics">Physics</option>
											<option value="Chemistry">Chemistry</option>
											<option value="Biology">Biology</option>
											<option value="Sanskrit">Sanskrit</option>
											<option value="Hindi">Hindi</option>
											<option value="English">English</option>
											<option value="Social Science">Social Science</option>
											<option value="Science">Science</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Class Preference <span className="text-red-500">*</span>
										</label>
										<select
											name="class"
											value={formData.class}
											onChange={handleChange}
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											required
										>
											<option value="">Select Class</option>
											<option value="Primary">Primary (1-5)</option>
											<option value="Middle">Middle (6-8)</option>
											<option value="Secondary">Secondary (9-10)</option>
											<option value="Higher Secondary">
												Higher Secondary (11-12)
											</option>
											<option value="Higher School">
												Higher School (9-12)
											</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Experience (Years) <span className="text-red-500">*</span>
										</label>
										<input
											type="number"
											name="experience"
											value={formData.experience}
											onChange={handleChange}
											min="0"
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											required
										/>
									</div>
								</div>

								<div className="col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Educational Qualifications{" "}
										<span className="text-red-500">*</span>
									</label>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<select
												name="qualifications"
												value={formData.qualifications}
												onChange={handleChange}
												className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
												required
											>
												<option value="">Select Highest Qualification</option>
												<option value="BA">BA</option>
												<option value="BSc">BSc</option>
												<option value="BCom">BCom</option>
												<option value="BCA">BCA</option>
												<option value="MA">MA</option>
												<option value="MSc">MSc</option>
												<option value="MCom">MCom</option>
												<option value="MCA">MCA</option>
												<option value="PhD">PhD</option>
											</select>
										</div>
										<div>
											<input
												type="text"
												placeholder="Specialization (e.g., Mathematics, Physics)"
												className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
												name="specialization"
												value={formData.specialization || ""}
												onChange={handleChange}
												required
											/>
										</div>
									</div>
								</div>

								<div className="col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Professional Qualifications{" "}
										<span className="text-red-500">*</span>
									</label>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<select
												name="professionalQualification"
												value={formData.professionalQualification}
												onChange={handleChange}
												className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
												required
											>
												<option value="">
													Select Professional Qualification
												</option>
												<option value="B.Ed">B.Ed</option>
												<option value="M.Ed">M.Ed</option>
												<option value="D.Ed">D.Ed</option>
												<option value="CTET">CTET</option>
												<option value="MPTET">MPTET</option>
												<option value="Other">Other</option>
											</select>
										</div>
										<div>
											{formData.professionalQualification === "Other" && (
												<input
													type="text"
													placeholder="Specify Other Qualification"
													className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
													name="otherProfessionalQualification"
													value={formData.otherProfessionalQualification || ""}
													onChange={handleChange}
													required
												/>
											)}
										</div>
									</div>
								</div>

								<div className="col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Address <span className="text-red-500">*</span>
									</label>
									<textarea
										name="address"
										value={formData.address}
										onChange={handleChange}
										rows={3}
										className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
										required
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											District <span className="text-red-500">*</span>
										</label>
										<select
											name="district"
											value={formData.district}
											onChange={handleChange}
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											required
										>
											<option value="">Select District</option>
											{Object.keys(districts).map((district) => (
												<option key={district} value={district}>
													{district}
												</option>
											))}
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Block <span className="text-red-500">*</span>
										</label>
										<select
											name="block"
											value={formData.block}
											onChange={handleChange}
											className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
											disabled={!formData.district}
											required
										>
											<option value="">Select Block</option>
											{formData.district &&
												districts[formData.district]?.map((block) => (
													<option key={block} value={block}>
														{block}
													</option>
												))}
										</select>
									</div>
								</div>

								<div>
									<ReCAPTCHA
										sitekey="6LcftbUpAAAAAM_u0aqDmAHve_F4cYE4f3ePsX-5"
										onChange={handleCaptchaChange}
									/>
								</div>

								<button
									type="submit"
									disabled={!formData.captchaToken}
									className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 ${
										formData.captchaToken
											? "bg-red-600 hover:bg-red-700 text-white"
											: "bg-gray-300 cursor-not-allowed text-gray-500"
									}`}
								>
									<Send className="w-5 h-5" />
									<span>Submit Application</span>
								</button>
							</form>
						</div>
					</motion.div>
				</div>
			</div>

			{showModal && selectedImage && (
				<Modal
					showModal={showModal}
					setShowModal={setShowModal}
					imageUrl={selectedImage}
				/>
			)}

			<Footer />
		</>
	);
};

export default Careers;
