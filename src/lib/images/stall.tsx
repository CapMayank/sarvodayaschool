/** @format */

const totalImages = 46; // Adjust this if new images are added
const stall = Array.from({ length: totalImages }, (_, index) => ({
	id: totalImages - index, // Starts from totalImages and goes to 1
	class: "Stall",
	imageUrl: `/gallery/Stall/image${totalImages - index}.jpg`,
}));

export default stall;
