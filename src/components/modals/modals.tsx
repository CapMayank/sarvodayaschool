/** @format */

import Image from "next/image";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

interface ModalProps {
	showModal: boolean;
	setShowModal: (show: boolean) => void;
	imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, imageUrl }) => {
	if (!showModal) return null;
	const downloadImage = () => {
		// Extract the filename from the image URL
		const fileName = imageUrl.split("/").pop() || "image";
		// Initiate download using file-saver library
		saveAs(imageUrl, fileName);
	};

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-y-auto">
				<div className=" absolute max-h-full ">
					<FaTimes
						className="absolute top-0 right-0 m-4 text-black bg-white text-2xl cursor-pointer"
						onClick={() => setShowModal(false)}
					/>
					<FaDownload
						className="absolute bottom-0 right-0 m-4 text-black text-2xl cursor-pointer"
						onClick={downloadImage}
					/>

					<Image src={imageUrl} alt="Full Screen" width={1000} height={1000} />
				</div>
				{/* Add a download button */}
			</div>
		</>
	);
};

export default Modal;
