/** @format */
"use client";
import React from "react";
import GalleryPage from "@/components/galleryPage/galleryPage"; // Update the path as needed
import cultural from "@/lib/images/cultural";

export default function Gallery() {
	return (
		<GalleryPage
			title="Cultural Programme"
			images={cultural.map((image) => ({ ...image, id: image.id.toString() }))}
			filterFunction={(image) => image.class === "Cultural_Programme"}
		/>
	);
}
