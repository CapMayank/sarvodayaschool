/** @format */

const totalImages = 88; // Adjust this if new images are added
const cultural = Array.from({ length: totalImages }, (_, index) => ({
	id: totalImages - index, // Starts from totalImages and goes to 1
	class: "Cultural_Programme",
	imageUrl: `/gallery/CulturalProgram/image${totalImages - index}.jpg`,
}));

export default cultural;
