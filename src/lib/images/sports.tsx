/** @format */

/** @format */

const totalImages = 53; // Adjust this if new images are added
const sports = Array.from({ length: totalImages }, (_, index) => ({
	id: totalImages - index, // Starts from totalImages and goes to 1
	class: "Sports",
	imageUrl: `/gallery/Sports/image${totalImages - index}.jpg`,
}));

export default sports;
