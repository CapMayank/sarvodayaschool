/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { deleteCloudinaryImage } from "@/lib/cloudinary-helper";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import ReorderableList from "@/components/admin/ReorderableList";

export default function AchievementsTab() {
	const [achievements, setAchievements] = useState<any[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isReordering, setIsReordering] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		imageUrl: "",
		order: 0,
	});

	useEffect(() => {
		loadAchievements();
	}, []);

	const loadAchievements = async () => {
		try {
			const data = await apiClient.getAchievements();
			setAchievements(data);
		} catch (error) {
			console.error("Error loading achievements:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.imageUrl) {
			alert("Please upload an image");
			return;
		}

		try {
			if (editingId) {
				await apiClient.updateAchievement(editingId, formData);
			} else {
				await apiClient.createAchievement(formData);
			}
			setFormData({ title: "", description: "", imageUrl: "", order: 0 });
			setIsAdding(false);
			setEditingId(null);
			loadAchievements();
		} catch (error) {
			console.error("Error saving achievement:", error);
			alert("Failed to save achievement");
		}
	};

	const handleEdit = (achievement: any) => {
		setFormData({
			title: achievement.title,
			description: achievement.description,
			imageUrl: achievement.imageUrl,
			order: achievement.order,
		});
		setEditingId(achievement.id);
		setIsAdding(true);
	};

	const handleDelete = async (id: number) => {
		const achievement = achievements.find((a) => a.id === id);

		if (!confirm("Are you sure you want to delete this achievement?")) return;

		try {
			// Delete from database first
			await apiClient.deleteAchievement(id);

			// Then delete image from Cloudinary
			if (achievement?.imageUrl) {
				const deleted = await deleteCloudinaryImage(achievement.imageUrl);
				if (!deleted) {
					console.warn(
						"Database entry deleted but Cloudinary image deletion failed"
					);
				}
			}

			loadAchievements();
		} catch (error) {
			console.error("Error deleting achievement:", error);
			alert("Failed to delete achievement");
		}
	};

	const handleReorder = async (reorderedItems: any[]) => {
		setIsReordering(true);
		try {
			// Update all items with new order
			for (const item of reorderedItems) {
				await apiClient.updateAchievement(item.id, {
					title: item.title,
					description: item.description,
					imageUrl: item.imageUrl,
					order: item.order,
				});
			}
			setAchievements(reorderedItems);
			alert("Order updated successfully!");
		} catch (error) {
			console.error("Error reordering:", error);
			alert("Failed to update order");
			loadAchievements(); // Reload on error
		} finally {
			setIsReordering(false);
		}
	};

	return (
		<div>
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Manage Achievements</h2>
				<button
					onClick={() => {
						setIsAdding(!isAdding);
						setEditingId(null);
						setFormData({ title: "", description: "", imageUrl: "", order: 0 });
					}}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				>
					{isAdding ? "Cancel" : "Add New"}
				</button>
			</div>

			{/* Form Section */}
			{isAdding && (
				<div className="bg-white p-6 rounded-lg shadow mb-6">
					<h3 className="text-lg font-semibold mb-4">
						{editingId ? "Edit Achievement" : "Add New Achievement"}
					</h3>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">Title</label>
							<input
								type="text"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								className="w-full p-2 border rounded"
								placeholder="Enter achievement title"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Description
							</label>
							<textarea
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								className="w-full p-2 border rounded"
								rows={3}
								placeholder="Enter achievement description"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Image</label>
							<CloudinaryUpload
								currentImage={formData.imageUrl}
								folder="sarvodaya/achievements"
								onUploadSuccess={(url) =>
									setFormData({ ...formData, imageUrl: url })
								}
							/>
							{!formData.imageUrl && (
								<p className="text-red-600 text-sm mt-1">Image is required</p>
							)}
						</div>
						<button
							type="submit"
							disabled={!formData.imageUrl || isReordering}
							className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{editingId ? "Update Achievement" : "Create Achievement"}
						</button>
					</form>
				</div>
			)}

			{/* List Section */}
			<div className="bg-white rounded-lg shadow p-6">
				{achievements.length > 0 && (
					<div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
						<p className="text-sm text-blue-800">
							💡 <strong>Drag items to reorder them.</strong> Changes are saved
							automatically.
						</p>
					</div>
				)}

				{achievements.length === 0 ? (
					<div className="text-center py-12 text-gray-500">
						<svg
							className="mx-auto h-12 w-12 text-gray-400 mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4M7 20H5a2 2 0 01-2-2V5a2 2 0 012-2h6.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-3.586a1 1 0 00-.707.293l-5.414-5.414a1 1 0 00-.293-.707V5a2 2 0 012-2h6.586"
							/>
						</svg>
						<p className="text-lg font-medium">No achievements yet</p>
						<p className="mt-1">
							Click "Add New" to create your first achievement.
						</p>
					</div>
				) : (
					<ReorderableList items={achievements} onReorder={handleReorder}>
						{(item, index) => (
							<div className="flex items-center justify-between w-full">
								<div className="flex items-start gap-4 flex-grow">
									{/* Image */}
									<img
										src={item.imageUrl}
										alt={item.title}
										className="h-14 w-14 object-cover rounded-lg border border-gray-200 flex-shrink-0"
									/>

									{/* Content */}
									<div className="flex-grow min-w-0">
										<div className="font-medium text-gray-900 truncate">
											{item.title}
										</div>
										<div className="text-sm text-gray-600 line-clamp-2">
											{item.description}
										</div>
										<div className="text-xs text-gray-500 mt-2 font-medium">
											Position:{" "}
											<span className="bg-gray-100 px-2 py-1 rounded">
												#{index + 1}
											</span>
										</div>
									</div>
								</div>

								{/* Actions */}
								<div className="flex gap-2 flex-shrink-0 ml-4">
									<button
										onClick={() => handleEdit(item)}
										className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(item.id)}
										className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors whitespace-nowrap"
									>
										Delete
									</button>
								</div>
							</div>
						)}
					</ReorderableList>
				)}
			</div>
		</div>
	);
}
