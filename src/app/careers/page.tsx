/** @format */

"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Modal from "@/components/modals/modals";
import Image from "next/image";

const Careers: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		gender: "",
		mobileNumber: "",
		address: "",
		qualifications: "",
		professionalQualification: "",
		subject: "",
		class: "",
		experience: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleCaptchaChange = (value: string | null) => {
		console.log("Captcha value:", value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Construct WhatsApp message with form data
		let message = `
      Name: ${formData.name}
      Gender: ${formData.gender}
      Mobile Number: ${formData.mobileNumber}
      Address: ${formData.address}
      Qualifications: ${formData.qualifications}
      Professional Qualification: ${formData.professionalQualification}
      Subject: ${formData.subject}
      Class: ${formData.class}
      Experience: ${formData.experience} years
    `;

		// Encode message for URL
		const encodedMessage = encodeURIComponent(message);

		// Construct WhatsApp URL with the message
		const whatsappURL = `https://wa.me/918989646850?text=${encodedMessage}`;

		// Open WhatsApp link
		window.open(whatsappURL, "_blank")?.focus();
	};
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
		setShowModal(true);
	};

	return (
		<>
			<Header title="Careers" />
			<div className=" flex justify-center ">
				<div className=" md:w-[90%] gap-2 mt-5 flex flex-col lg:flex-row justify-center bg-opacity-10 bg-gray-200 p-5">
					<div className=" md:w-[50%]  bg-white bg-opacity-90 rounded-lg p-5 mb-5 lg:mb-0 shadow-lg flex flex-col items-center">
						<h2 className="text-2xl font-bold text-gray-700 mb-4">
							Teacher Requirement for Academic Year 2025-26
						</h2>
						<p className="text-lg text-gray-600">
							<strong className="text-red-600">Subjects:</strong> Mathematics,
							Biology, Physics, Chemistry, Sanskrit, Sociology, Commerce, Hindi,
							English
						</p>
						<p className="text-lg text-gray-600">
							<strong className="text-red-600">Teaching Levels:</strong> Classes
							6th to 12th
						</p>
						<p className="text-lg text-gray-600">
							<strong className="text-red-600">Job Description:</strong> We are
							looking for experienced and dedicated teachers to join our faculty
							for the upcoming academic year. Teachers will be responsible for
							delivering high-quality instruction in their respective subjects,
							developing engaging lesson plans, assessing student progress, and
							fostering a positive learning environment.
						</p>
						<p className="text-lg text-gray-600">
							<strong className="text-red-600">Requirements:</strong> Candidates
							must have a Bachelor&rsquo;s Degree or higher in the relevant
							subject area, along with teaching certification and prior teaching
							experience. Strong communication skills, subject expertise, and a
							passion for education are essential.
						</p>
						<p className="text-lg text-gray-600">
							<strong className="text-red-600">Starting Salary:</strong> Rs.
							20,000/- to Rs. 25,000/- per month (negotiable based on
							qualifications and experience)
						</p>

						<Image
							src="/careers.png"
							alt="Teacher Recruitment Poster"
							width={1000}
							height={1000}
							className="rounded-sm mt-5"
							onClick={() => openModal("/careers.png")}
						/>
					</div>
					<div className="md:w-[50%] bg-white bg-opacity-90 p-5 rounded-lg shadow-lg  lg:w-1/2">
						<h2 className="text-2xl font-bold text-gray-700 mb-6">
							Apply Now - 2025-26 Academic Year
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label htmlFor="name" className="block font-bold mb-1">
									Name: <span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="gender" className="block font-bold mb-1">
									Gender: <span className="text-red-600">*</span>
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								>
									<option value="">Select Gender</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
							<div className="mb-4">
								<label htmlFor="mobileNumber" className="block font-bold mb-1">
									Mobile Number: <span className="text-red-600">*</span>
								</label>
								<input
									type="tel"
									id="mobileNumber"
									name="mobileNumber"
									value={formData.mobileNumber}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="address" className="block font-bold mb-1">
									Address: <span className="text-red-600">*</span>
								</label>
								<textarea
									id="address"
									name="address"
									value={formData.address}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="qualifications"
									className="block font-bold mb-1"
								>
									Qualifications: <span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									id="qualifications"
									name="qualifications"
									value={formData.qualifications}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="professionalQualification"
									className="block font-bold mb-1"
								>
									Professional Qualification:{" "}
									<span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									id="professionalQualification"
									name="professionalQualification"
									value={formData.professionalQualification}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="subject" className="block font-bold mb-1">
									Subject: <span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="class" className="block font-bold mb-1">
									Class: <span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									id="class"
									name="class"
									value={formData.class}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="experience" className="block font-bold mb-1">
									Experience (in years): <span className="text-red-600">*</span>
								</label>
								<input
									type="number"
									id="experience"
									name="experience"
									value={formData.experience}
									onChange={handleChange}
									required
									className="w-full p-2 border border-red-600 rounded"
								/>
							</div>
							<div className="captcha mb-4">
								<ReCAPTCHA
									sitekey="6LcftbUpAAAAAM_u0aqDmAHve_F4cYE4f3ePsX-5"
									onChange={handleCaptchaChange}
								/>
							</div>
							<button
								type="submit"
								className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
				{showModal && selectedImage && (
					<Modal
						showModal={showModal}
						setShowModal={setShowModal}
						imageUrl={selectedImage}
					/>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Careers;
