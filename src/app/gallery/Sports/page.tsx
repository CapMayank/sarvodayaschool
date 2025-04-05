/** @format */
"use client";
import React from "react";
import GalleryPage from "@/components/galleryPage/galleryPage"; // Update the path as needed
import sports from "@/lib/images/sports";

export default function Gallery() {
	return (
		<GalleryPage
			title="Sports"
			images={sports.map((image) => ({ ...image, id: image.id.toString() }))}
			filterFunction={(image) => image.class === "Sports"}
		/>
	);
}
