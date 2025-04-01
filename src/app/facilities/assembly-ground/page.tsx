/** @format */
import { notFound } from "next/navigation";
import Image from "next/image";
import facilities from "@/lib/facilities/facilities";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import ClientModal from "@/components/ClientModal";

// Page component
export default function Facilties() {
	// Retrieve the facility data
	const facility = facilities.find((f) => f.id === "assembly-ground");

	// Handle case where facility is not found
	if (!facility) {
		notFound();
	}

	return (
		<>
			<Header title={facility.title} />

			<div className="bg-white shadow-lg rounded-lg p-8 mt-20 max-w-6xl mx-auto">
				{/* Facility Image */}
				<div className="flex justify-center mb-8">
					<ClientModal imageUrl={facility.imageUrl} altText={facility.title}>
						<Image
							src={facility.imageUrl}
							alt={facility.title}
							width={900}
							height={500}
							className="rounded-lg shadow-lg object-cover hover:opacity-90 transition-opacity cursor-pointer"
							priority
						/>
					</ClientModal>
				</div>

				{/* Content - using optional chaining to avoid errors */}
				<h1 className="text-3xl font-bold text-center mb-6">
					{facility.title}
				</h1>
				<p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed mb-8">
					{facility.description}
				</p>
				{/* Dynamic Facility Highlights */}
				{facility.highlights && facility.highlights.length > 0 && (
					<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
						{facility.highlights.map((highlight, index) => (
							<div
								key={index}
								className="text-center p-6 border rounded-lg shadow-md bg-gray-50"
							>
								<h3 className="text-2xl font-semibold text-red-500">
									{highlight.title}
								</h3>
								<p className="text-lg text-gray-700 mt-2">{highlight.value}</p>
							</div>
						))}
					</div>
				)}

				{/* Facility Features */}
				{facility.facilityFeatures && facility.facilityFeatures.length > 0 && (
					<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
						{facility.facilityFeatures.map((feature, index) => (
							<div
								key={index}
								className="text-center p-6 border rounded-lg shadow-md bg-gray-50"
							>
								<h3 className="text-2xl font-semibold text-red-500">
									{feature.title}
								</h3>
								<p className="text-lg text-gray-700 mt-2">{feature.value}</p>
							</div>
						))}
					</div>
				)}

				{/* Media Gallery */}
				{facility.mediaGallery && facility.mediaGallery.length > 0 && (
					<div className="mt-12">
						<h2 className="text-2xl font-semibold mb-8 text-center">Gallery</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
							{facility.mediaGallery.map((media, index) => (
								<div
									key={index}
									className="bg-gray-50 p-4 rounded-lg shadow-md"
								>
									{media.type === "image" && (
										<ClientModal
											imageUrl={media.src}
											altText={media.caption || "Gallery image"}
										>
											<Image
												src={media.src}
												alt={media.caption || "Gallery image"}
												width={400}
												height={300}
												className="rounded-lg shadow-md object-cover w-full h-[220px] hover:scale-105 transition-transform duration-300 cursor-pointer"
											/>
										</ClientModal>
									)}
									{media.type === "youtube" && (
										<iframe
											className="w-full h-[220px] rounded-lg shadow-md"
											src={`https://www.youtube.com/embed/${media.src}`}
											title={media.caption || "YouTube video"}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										></iframe>
									)}
									{media.caption && (
										<p className="text-center text-gray-600 mt-2">
											{media.caption}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* Call to Action */}
				<div className="flex flex-col items-center mt-12">
					<a
						href="/admission"
						className="px-8 py-4 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-lg transition duration-300 text-lg font-semibold"
					>
						Apply for Admission
					</a>
				</div>
			</div>

			<Footer />
		</>
	);
}
