/** @format */

import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "@/app/providers";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: {
		default: "Admin Dashboard | Sarvodaya English Higher Secondary School",
		template: "%s | Admin | Sarvodaya English Higher Secondary School",
	},
	description: "Admin panel for managing school content and operations",
	robots: {
		index: false,
		follow: false,
	},
};

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				{/* Google Analytics */}
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-MCB7FZGZKK"
				/>
				<Script
					id="google-analytics-admin"
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
				<Providers>
					<SessionProvider>{children}</SessionProvider>
				</Providers>
			</body>
		</html>
	);
}
