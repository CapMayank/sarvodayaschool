/** @format */

const totalImages = 116; // Adjust this if new images are added
const science = Array.from({ length: totalImages }, (_, index) => ({
	id: totalImages - index, // Starts from totalImages and goes to 1
	class: "Science_Exhibition",
	imageUrl: `/gallery/ScienceExhibition/image${totalImages - index}.jpg`,
}));

export default science;
