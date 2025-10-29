/** @format */

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
	try {
		const { folders } = await cloudinary.api.sub_folders("sarvodayaGallery");

		const categoriesWithThumbs = await Promise.all(
			folders.map(async (folder) => {
				const { resources } = await cloudinary.search
					.expression(`folder:sarvodayaGallery/${folder.name}/*`)
					.sort_by("created_at", "desc")
					.max_results(1)
					.execute();

				return {
					name: folder.name,
					path: folder.path,
					thumbnail: resources[0]?.public_id || null,
				};
			})
		);

		return NextResponse.json({ categories: categoriesWithThumbs });
	} catch (error) {
		console.error("Cloudinary error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 }
		);
	}
}
