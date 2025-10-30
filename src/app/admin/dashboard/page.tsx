/** @format */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTabs, { Tab } from "@/components/admin/AdminTabs";
import AchievementsTab from "@/components/admin/AchievementsTab";
import SlideshowsTab from "@/components/admin/SlideshowsTab";
import NewsTab from "@/components/admin/NewsTab";
import AdmissionsTab from "@/components/admin/AdmissionsTab";
import TeachersTab from "@/components/admin/TeachersTab";
import UsersTab from "@/components/admin/UsersTab"; // ← NEW

export default function AdminDashboard() {
	const router = useRouter();
	const { status } = useSession();
	const [activeTab, setActiveTab] = useState<Tab>("achievements");

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/admin");
		}
	}, [status, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<AdminHeader />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
				<AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

				<div className="mt-8">
					{activeTab === "achievements" && <AchievementsTab />}
					{activeTab === "slideshows" && <SlideshowsTab />}
					{activeTab === "news" && <NewsTab />}
					{activeTab === "admissions" && <AdmissionsTab />}
					{activeTab === "teachers" && <TeachersTab />}
					{activeTab === "users" && <UsersTab />} {/* ← NEW */}
				</div>
			</div>
		</div>
	);
}
