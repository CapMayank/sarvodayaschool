/** @format */

"use client";

type Tab = "achievements" | "slideshows" | "news" | "admissions" | "teachers";

interface AdminTabsProps {
	activeTab: Tab;
	onTabChange: (tab: Tab) => void;
}

export default function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
	const tabs = [
		{ id: "achievements" as Tab, label: "Achievements" },
		{ id: "slideshows" as Tab, label: "Slideshows" },
		{ id: "news" as Tab, label: "News" },
		{ id: "admissions" as Tab, label: "Admission Forms" },
		{ id: "teachers" as Tab, label: "Teacher Applications" },
		{ id: "users" as Tab, label: "Admin Users" }, // ← NEW
	];

	return (
		<div className="border-b border-gray-200">
			<nav className="-mb-px flex space-x-8">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => onTabChange(tab.id)}
						className={`py-4 px-1 border-b-2 font-medium text-sm ${
							activeTab === tab.id
								? "border-red-500 text-red-600"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
						}`}
					>
						{tab.label}
					</button>
				))}
			</nav>
		</div>
	);
}

export type { Tab };
