/** @format */
"use client";
import React from "react";
import GalleryPage from "@/components/galleryPage/galleryPage"; // Update the path as needed
import science from "@/lib/images/science";

export default function Gallery() {
	return (
		<GalleryPage
			title="Science Exhibition"
			images={science.map((image) => ({ ...image, id: image.id.toString() }))}
			filterFunction={(image) => image.class === "Science_Exhibition"}
		/>
	);
}
