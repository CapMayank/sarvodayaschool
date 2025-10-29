/** @format */

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Categories to fetch thumbnails for
const categories = [
	"Cultural_Programme",
	"Stall",
	"Science_Exhibition",
	"Sports",
	"Class_Activities",
];

export async function GET() {
	try {
		// Fetch all thumbnails in parallel (much faster!)
		const thumbnailPromises = categories.map(async (category) => {
			try {
				const { resources } = await cloudinary.search
					.expression(`folder:sarvodayaGallery/${category}/*`)
					.sort_by("created_at", "desc")
					.max_results(1)
					.execute();

				return {
					category,
					thumbnail: resources[0]?.public_id || null,
				};
			} catch (error) {
				console.error(`Error fetching thumbnail for ${category}:`, error);
				return {
					category,
					thumbnail: null,
				};
			}
		});

		const results = await Promise.all(thumbnailPromises);

		// Convert array to object for easy lookup
		const thumbnails = results.reduce((acc, { category, thumbnail }) => {
			if (thumbnail) {
				acc[category] = thumbnail;
			}
			return acc;
		}, {});

		return NextResponse.json({ thumbnails });
	} catch (error) {
		console.error("Thumbnails API error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch thumbnails" },
			{ status: 500 }
		);
	}
}
