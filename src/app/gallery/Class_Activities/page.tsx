/** @format */
"use client";
import React from "react";
import GalleryPage from "@/components/galleryPage/galleryPage"; // Update the path as needed
import classActivities from "@/lib/images/activities"; // Import the images array

export default function Gallery() {
	return (
		<GalleryPage
			title="Class Activities"
			images={classActivities.map((image) => ({
				...image,
				id: image.id.toString(),
			}))}
			filterFunction={(image) => image.class === "Class_Activities"}
		/>
	);
}
