/** @format */
import facilities from "@/lib/facilities/facilities";
import FacilityPage from "@/components/facilityPage/faciltyPage"; // Update the path as needed

export default function Facilities() {
	// Retrieve the facility data
	const facility = facilities.find((f) => f.id === "laboratories");

	// Pass the facility data to the component
	if (!facility) {
		return <div>Facility not found</div>;
	}

	return <FacilityPage facility={facility} />;
}
