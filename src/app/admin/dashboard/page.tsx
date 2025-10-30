/** @format */

"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
	AlertCircle,
	Loader,
	LogOut,
	Bell,
	Settings,
	Menu,
	X,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTabs, { Tab } from "@/components/admin/AdminTabs";
import AchievementsTab from "@/components/admin/AchievementsTab";
import SlideshowsTab from "@/components/admin/SlideshowsTab";
import NewsTab from "@/components/admin/NewsTab";
import AdmissionsTab from "@/components/admin/AdmissionsTab";
import TeachersTab from "@/components/admin/TeachersTab";
import UsersTab from "@/components/admin/UsersTab";
import Header from "@/components/header/header";

// Loading Skeleton Component
const TabLoadingSkeleton = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		className="space-y-4"
	>
		{[...Array(5)].map((_, i) => (
			<div key={i} className="bg-gray-200 h-12 rounded-lg animate-pulse" />
		))}
	</motion.div>
);

// Error Boundary Component
const ErrorFallback = ({
	error,
	resetError,
}: {
	error: string;
	resetError: () => void;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg"
	>
		<div className="flex items-start space-x-4">
			<AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
			<div className="flex-1">
				<h3 className="font-semibold text-red-900 mb-2">Error Loading Tab</h3>
				<p className="text-red-800 text-sm mb-4">{error}</p>
				<button
					onClick={resetError}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
				>
					Try Again
				</button>
			</div>
		</div>
	</motion.div>
);

// Tab Content Wrapper
const TabContent = ({
	activeTab,
	onError,
}: {
	activeTab: Tab;
	onError: (error: string) => void;
}) => {
	const [error, setError] = useState<string | null>(null);

	const handleError = (errorMsg: string) => {
		setError(errorMsg);
		onError(errorMsg);
	};

	if (error) {
		return <ErrorFallback error={error} resetError={() => setError(null)} />;
	}

	return (
		<Suspense fallback={<TabLoadingSkeleton />}>
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					{activeTab === "achievements" && <AchievementsTab />}
					{activeTab === "slideshows" && <SlideshowsTab />}
					{activeTab === "news" && <NewsTab />}
					{activeTab === "admissions" && <AdmissionsTab />}
					{activeTab === "teachers" && <TeachersTab />}
					{activeTab === "users" && <UsersTab />}
				</motion.div>
			</AnimatePresence>
		</Suspense>
	);
};

export default function AdminDashboard() {
	const router = useRouter();
	const { status, data: session } = useSession();
	const [activeTab, setActiveTab] = useState<Tab>("achievements");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [tabError, setTabError] = useState<string | null>(null);
	const [isClient, setIsClient] = useState(false);

	// Ensure component only renders on client
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Redirect to login if unauthenticated
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/admin");
		}
	}, [status, router]);

	if (!isClient) {
		return null;
	}

	// Loading state
	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center"
				>
					<div className="inline-flex items-center justify-center mb-4">
						<Loader className="w-12 h-12 text-red-600 animate-spin" />
					</div>
					<p className="text-gray-300 font-medium">Loading your dashboard...</p>
					<p className="text-gray-500 text-sm mt-2">
						This may take a few seconds
					</p>
				</motion.div>
			</div>
		);
	}

	return (
		<>
			<Header title="Admin Dashboard" />
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
				{/* Header */}
				<AdminHeader />

				{/* Main Content */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1 }}
					className="min-h-[calc(100vh-80px)]"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{/* Page Title */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="mb-8"
						>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Dashboard
							</h1>
							<p className="text-gray-600 flex items-center space-x-2">
								<span>Welcome back,</span>
								<span className="font-semibold text-red-600">
									{session?.user?.name || "Admin"}
								</span>
							</p>
						</motion.div>

						{/* Tab Error Alert */}
						{tabError && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="mb-6"
							>
								<ErrorFallback
									error={tabError}
									resetError={() => setTabError(null)}
								/>
							</motion.div>
						)}

						{/* Tabs Navigation */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="mb-8"
						>
							<AdminTabs
								activeTab={activeTab}
								onTabChange={(tab) => {
									setActiveTab(tab);
									setTabError(null);
								}}
							/>
						</motion.div>

						{/* Tab Content */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="bg-white rounded-xl shadow-lg p-6 lg:p-8"
						>
							<TabContent
								activeTab={activeTab}
								onError={(error) => setTabError(error)}
							/>
						</motion.div>

						{/* Bottom Info Section */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
						>
							{/* Quick Stats */}
							<div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">
											Last Updated
										</p>
										<p className="text-2xl font-bold text-gray-900 mt-2">
											{new Date().toLocaleDateString()}
										</p>
									</div>
									<Bell className="w-10 h-10 text-red-100" />
								</div>
							</div>

							{/* User Info */}
							<div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">
											Logged in as
										</p>
										<p className="text-lg font-bold text-gray-900 mt-2 truncate">
											{session?.user?.email}
										</p>
									</div>
									<Settings className="w-10 h-10 text-blue-100" />
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</>
	);
}
