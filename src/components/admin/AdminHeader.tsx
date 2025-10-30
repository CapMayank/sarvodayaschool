/** @format */

"use client";

import { signOut } from "next-auth/react";

export default function AdminHeader() {
	const handleLogout = async () => {
		await signOut({ redirect: true, callbackUrl: "/admin" });
	};

	return (
		<div className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<h1 className="text-2xl font-bold text-red-600">
						Sarvodaya School - Admin Dashboard
					</h1>
					<button
						onClick={handleLogout}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}
