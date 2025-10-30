/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { deleteCloudinaryImage } from "@/lib/cloudinary-helper";

export default function AchievementsTab() {
	const [achievements, setAchievements] = useState<any[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
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

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Manage Achievements</h2>
				<button
					onClick={() => {
						setIsAdding(!isAdding);
						setEditingId(null);
						setFormData({ title: "", description: "", imageUrl: "", order: 0 });
					}}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
				>
					{isAdding ? "Cancel" : "Add New"}
				</button>
			</div>

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
						<div>
							<label className="block text-sm font-medium mb-2">
								Display Order
							</label>
							<input
								type="number"
								value={formData.order}
								onChange={(e) =>
									setFormData({
										...formData,
										order: parseInt(e.target.value) || 0,
									})
								}
								className="w-full p-2 border rounded"
								min="0"
							/>
							<p className="text-xs text-gray-500 mt-1">
								Lower numbers appear first (0, 1, 2, ...)
							</p>
						</div>
						<button
							type="submit"
							disabled={!formData.imageUrl}
							className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{editingId ? "Update Achievement" : "Create Achievement"}
						</button>
					</form>
				</div>
			)}

			<div className="bg-white rounded-lg shadow overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Image
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Title
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Description
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Order
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{achievements.map((achievement) => (
							<tr key={achievement.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<img
										src={achievement.imageUrl}
										alt={achievement.title}
										className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200"
									/>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="font-medium text-gray-900">
										{achievement.title}
									</div>
								</td>
								<td className="px-6 py-4 max-w-xs">
									<div className="text-sm text-gray-600 line-clamp-2">
										{achievement.description}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
										{achievement.order}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
									<button
										onClick={() => handleEdit(achievement)}
										className="text-blue-600 hover:text-blue-900 font-medium"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(achievement.id)}
										className="text-red-600 hover:text-red-900 font-medium"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{achievements.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<p className="text-lg font-medium">No achievements yet</p>
						<p className="mt-1">
							Click "Add New" to create your first achievement.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
