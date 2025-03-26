/** @format */

import Image from "next/image";
import React, { useEffect, useCallback } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

interface ModalProps {
	showModal: boolean;
	setShowModal: (show: boolean) => void;
	imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, imageUrl }) => {
	// Close on Escape key
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setShowModal(false);
			}
		},
		[setShowModal]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	if (!showModal) return null;

	// Close when clicking outside the image
	const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if ((event.target as HTMLDivElement).id === "modal-overlay") {
			setShowModal(false);
		}
	};

	// Download Image
	const downloadImage = () => {
		const fileName =
			imageUrl.substring(imageUrl.lastIndexOf("/") + 1) || "download";
		saveAs(imageUrl, fileName);
	};

	return (
		<div
			id="modal-overlay"
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md p-4 transition-opacity duration-300"
			onClick={handleOutsideClick}
		>
			<div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-lg">
				{/* Close Button */}
				<button
					className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-2 text-lg hover:bg-gray-600 transition"
					onClick={() => setShowModal(false)}
				>
					<FaTimes />
				</button>

				{/* Image */}
				<Image
					src={imageUrl}
					alt="Full Screen"
					width={1000}
					height={1000}
					className="w-full h-auto object-contain"
				/>

				{/* Download Button */}
				<button
					className="absolute bottom-3 right-3 bg-red-600 text-white rounded-full p-2 text-lg hover:bg-red-500 transition"
					onClick={downloadImage}
				>
					<FaDownload />
				</button>
			</div>
		</div>
	);
};

export default Modal;
