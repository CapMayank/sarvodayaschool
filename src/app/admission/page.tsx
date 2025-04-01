/** @format */
"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

// District and block data
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

const AdmissionForm: React.FC = () => {
	const [formData, setFormData] = useState({
		studentName: "",
		gender: "",
		fatherName: "",
		mobileNumber: "",
		class: "",
		district: "",
		block: "",
		address: "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;

		// Reset block selection when district changes
		if (name === "district") {
			setFormData({ ...formData, district: value, block: "" });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleCaptchaChange = (value: string | null) => {
		console.log("Captcha value:", value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const {
			studentName,
			gender,
			fatherName,
			mobileNumber,
			class: admissionClass,
			district,
			block,
			address,
		} = formData;

		const message = `
      Student Name: ${studentName}
      Gender: ${gender}
      Father's Name: ${fatherName}
      Mobile Number: ${mobileNumber}
      Class for Admission: ${admissionClass}
      District: ${district}
      Block: ${block}
      Address: ${address}
    `;

		const encodedMessage = encodeURIComponent(message);
		const whatsappURL = `https://wa.me/918989646850?text=${encodedMessage}`;
		window.open(whatsappURL, "_blank")?.focus();
	};

	return (
		<>
			<Header title="Admission Form" />

			<div className="flex justify-center ">
				<div className="flex gap-4 mt-5 md:w-[90%] justify-center flex-col sm:flex-row">
					<div className="flex md:w-[50%] justify-center my-2">
						<div className="w-[100%] p-6 border  bg-white bg-opacity-100 rounded-lg shadow-lg">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="studentName"
										className="block font-bold mb-2 text-gray-700"
									>
										Student Name:
									</label>
									<input
										type="text"
										id="studentName"
										name="studentName"
										value={formData.studentName}
										onChange={handleChange}
										required
										className="w-full p-2 border border-red-600 rounded"
									/>
								</div>
								<div>
									<label
										htmlFor="gender"
										className="block font-bold mb-2 text-gray-700"
									>
										Gender:
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
								<div>
									<label
										htmlFor="fatherName"
										className="block font-bold mb-2 text-gray-700"
									>
										Father Name:
									</label>
									<input
										type="text"
										id="fatherName"
										name="fatherName"
										value={formData.fatherName}
										onChange={handleChange}
										required
										className="w-full p-2 border border-red-600 rounded"
									/>
								</div>
								<div>
									<label
										htmlFor="mobileNumber"
										className="block font-bold mb-2 text-gray-700"
									>
										Mobile Number:
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
								<div>
									<label
										htmlFor="class"
										className="block font-bold mb-2 text-gray-700"
									>
										Class for Admission:
									</label>
									<select
										id="class"
										name="class"
										value={formData.class}
										onChange={handleChange}
										required
										className="w-full p-2 border border-red-600 rounded"
									>
										<option value="">Select Class</option>
										<option value="Nursery">Nursery</option>
										<option value="KGI">KGI</option>
										<option value="KGII">KGII</option>
										<option value="1st">1st</option>
										<option value="2nd">2nd</option>
										<option value="3rd">3rd</option>
										<option value="4th">4th</option>
										<option value="5th">5th</option>
										<option value="6th">6th</option>
										<option value="7th">7th</option>
										<option value="8th">8th</option>
										<option value="9th">9th</option>
										<option value="10th">10th</option>
										<option value="11th">11th</option>
										<option value="12th">12th</option>
									</select>
								</div>

								{/* District Dropdown - New */}
								<div>
									<label
										htmlFor="district"
										className="block font-bold mb-2 text-gray-700"
									>
										District:
									</label>
									<select
										id="district"
										name="district"
										value={formData.district}
										onChange={handleChange}
										required
										className="w-full p-2 border border-red-600 rounded"
									>
										<option value="">Select District</option>
										{Object.keys(districts).map((district) => (
											<option key={district} value={district}>
												{district}
											</option>
										))}
									</select>
								</div>

								{/* Block Dropdown - New */}
								<div>
									<label
										htmlFor="block"
										className="block font-bold mb-2 text-gray-700"
									>
										Block:
									</label>
									<select
										id="block"
										name="block"
										value={formData.block}
										onChange={handleChange}
										required
										className="w-full p-2 border border-red-600 rounded"
										disabled={!formData.district} // Disable if no district is selected
									>
										<option value="">Select Block</option>
										{formData.district &&
											districts[formData.district]?.map((block: string) => (
												<option key={block} value={block}>
													{block}
												</option>
											))}
									</select>
								</div>

								<div>
									<label
										htmlFor="address"
										className="block font-bold mb-2 text-gray-700"
									>
										Address:
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
								<div>
									<ReCAPTCHA
										sitekey="6LcftbUpAAAAAM_u0aqDmAHve_F4cYE4f3ePsX-5"
										onChange={handleCaptchaChange}
									/>
								</div>
								<button
									type="submit"
									className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
								>
									Submit
								</button>
							</form>
						</div>
					</div>
					<div className="flex md:w-[50%] justify-center p-2 my-2 border bg-white bg-opacity-90 rounded-lg shadow-lg">
						<div className="text-center">
							<Image
								src="/fee_structure26.png"
								alt="Fee Structure"
								width={1000}
								height={1000}
							/>
							<a href="/fee_structure26.png" download="fee_structure.png">
								<button className="m-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
									Download Fee Structure
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AdmissionForm;
