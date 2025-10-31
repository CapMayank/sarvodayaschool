/** @format */

"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import AchievementsTab from "./AchievementsTab";
import SlideshowsTab from "./SlideshowsTab";
import NewsTab from "./NewsTab";
import AdmissionsTab from "./AdmissionsTab";
import TeachersTab from "./TeachersTab";
import UsersTab from "./UsersTab";
import GalleryTab from "./GalleryTab";

const TabLoadingSkeleton = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		className="space-y-4"
	>
		<div className="bg-gray-200 h-12 rounded-lg animate-pulse" />
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{[...Array(6)].map((_, i) => (
				<div key={i} className="bg-gray-200 h-64 rounded-lg animate-pulse" />
			))}
		</div>
		<div className="space-y-3 mt-6">
			{[...Array(3)].map((_, i) => (
				<div key={i} className="bg-gray-200 h-12 rounded-lg animate-pulse" />
			))}
		</div>
	</motion.div>
);

export const AchievementsTabWrapper = () => (
	<Suspense fallback={<TabLoadingSkeleton />}>
		<AchievementsTab />
	</Suspense>
);

export const SlideshowsTabWrapper = () => (
	<Suspense fallback={<TabLoadingSkeleton />}>
		<SlideshowsTab />
	</Suspense>
);

export const NewsTabWrapper = () => (
	<Suspense fallback={<TabLoadingSkeleton />}>
		<NewsTab />
	</Suspense>
);

export const AdmissionsTabWrapper = () => (
	<Suspense fallback={<TabLoadingSkeleton />}>
		<AdmissionsTab />
	</Suspense>
);

export const TeachersTabWrapper = () => (
	<Suspense fallback={<TabLoadingSkeleton />}>
		<TeachersTab />
	</Suspense>
);

export const UsersTabWrapper = () => (
	<Suspense fallback={<TabLoadingSkeleton />}>
		<UsersTab />
	</Suspense>
);

export const GalleryTabWrapper = () => (
	<Suspense fallback={<TabLoadingSkeleton />}>
		<GalleryTab />
	</Suspense>
);
