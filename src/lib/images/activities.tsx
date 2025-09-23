/** @format */

const totalImages = 78; // Adjust this if new images are added
const classActivities = Array.from({ length: totalImages }, (_, index) => ({
	id: totalImages - index, // Starts from totalImages and goes to 1
	class: "Class_Activities",
	imageUrl: `/gallery/ClassActivities/image${totalImages - index}.png`,
}));

export default classActivities;
