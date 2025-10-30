/**
 * Extract public_id from Cloudinary URL
 * Example: https://res.cloudinary.com/dfdsfzuxs/image/upload/v1234567890/sarvodaya/achievements/image.jpg
 * Returns: sarvodaya/achievements/image
 *
 * @format
 */

export function extractPublicId(cloudinaryUrl: string): string | null {
	try {
		const urlParts = cloudinaryUrl.split("/");
		const uploadIndex = urlParts.findIndex((part) => part === "upload");

		if (uploadIndex === -1) return null;

		// Get everything after /upload/v1234567890/
		const pathAfterVersion = urlParts.slice(uploadIndex + 2).join("/");

		// Remove file extension
		const publicId = pathAfterVersion.replace(/\.[^/.]+$/, "");

		return publicId;
	} catch (error) {
		console.error("Error extracting public_id:", error);
		return null;
	}
}

/**
 * Delete image from Cloudinary
 */
export async function deleteCloudinaryImage(
	imageUrl: string
): Promise<boolean> {
	try {
		const publicId = extractPublicId(imageUrl);

		if (!publicId) {
			console.error("Could not extract public_id from URL:", imageUrl);
			return false;
		}

		const response = await fetch("/api/cloudinary/delete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ publicId }),
		});

		if (!response.ok) {
			console.error("Failed to delete image from Cloudinary");
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error deleting Cloudinary image:", error);
		return false;
	}
}
