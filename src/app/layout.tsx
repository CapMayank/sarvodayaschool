/** @format */

import Navbar from "@/components/navbar/navbar";
import "./global.css";
import Banner from "@/components/banner/banner";

export const metadata = {
	title: {
		default: "Sarvodaya English Higher Secondary School Lakhnadon",
		template: "%s | Sarvodaya English Higher Secondary School Lakhnadon",
	},
	description:
		"Providing quality education in Lakhnadon . A Commitment to Best Education and Discipline for a Better World",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				{<Navbar />}
				{children}
			</body>
		</html>
	);
}
