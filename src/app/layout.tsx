/** @format */

import Navbar from "@/components/navbar/navbar";
import Script from "next/script"; // Import next/script
import "./global.css";
import Banner from "@/components/banner/banner";
import { Providers } from "./providers";

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
			<head>
				{/* Google Analytics using next/script */}
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-MCB7FZGZKK"
				/>
				<Script
					id="google-analytics"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MCB7FZGZKK');
            `,
					}}
				/>
			</head>
			<body>
				<Navbar />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
