/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { deleteCloudinaryImage } from "@/lib/cloudinary-helper";

export default function SlideshowsTab() {
	const [slideshows, setSlideshows] = useState<any[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		imageUrl: "",
		isActive: true,
		order: 0,
	});

	useEffect(() => {
		loadSlideshows();
	}, []);

	const loadSlideshows = async () => {
		try {
			const data = await apiClient.getSlideshows();
			setSlideshows(data);
		} catch (error) {
			console.error("Error loading slideshows:", error);
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
				await apiClient.updateSlideshow(editingId, formData);
			} else {
				await apiClient.createSlideshow(formData);
			}
			setFormData({ title: "", imageUrl: "", isActive: true, order: 0 });
			setIsAdding(false);
			setEditingId(null);
			loadSlideshows();
		} catch (error) {
			console.error("Error saving slideshow:", error);
			alert("Failed to save slideshow");
		}
	};

	const handleEdit = (slideshow: any) => {
		setFormData({
			title: slideshow.title || "",
			imageUrl: slideshow.imageUrl,
			isActive: slideshow.isActive,
			order: slideshow.order,
		});
		setEditingId(slideshow.id);
		setIsAdding(true);
	};

	const handleDelete = async (id: number) => {
		const slideshow = slideshows.find((s) => s.id === id);

		if (!confirm("Are you sure you want to delete this slideshow?")) return;

		try {
			// Delete from database first
			await apiClient.deleteSlideshow(id);

			// Then delete image from Cloudinary
			if (slideshow?.imageUrl) {
				const deleted = await deleteCloudinaryImage(slideshow.imageUrl);
				if (!deleted) {
					console.warn(
						"Database entry deleted but Cloudinary image deletion failed"
					);
				}
			}

			loadSlideshows();
		} catch (error) {
			console.error("Error deleting slideshow:", error);
			alert("Failed to delete slideshow");
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Manage Slideshows</h2>
				<button
					onClick={() => {
						setIsAdding(!isAdding);
						setEditingId(null);
						setFormData({ title: "", imageUrl: "", isActive: true, order: 0 });
					}}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
				>
					{isAdding ? "Cancel" : "Add New"}
				</button>
			</div>

			{isAdding && (
				<div className="bg-white p-6 rounded-lg shadow mb-6">
					<h3 className="text-lg font-semibold mb-4">
						{editingId ? "Edit Slideshow" : "Add New Slideshow"}
					</h3>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">
								Title (Optional)
							</label>
							<input
								type="text"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								className="w-full p-2 border rounded"
								placeholder="Banner title"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Banner Image
							</label>
							<CloudinaryUpload
								currentImage={formData.imageUrl}
								folder="sarvodaya/slideshows"
								onUploadSuccess={(url) =>
									setFormData({ ...formData, imageUrl: url })
								}
							/>
							{!formData.imageUrl && (
								<p className="text-red-600 text-sm mt-1">Image is required</p>
							)}
						</div>
						<div>
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={formData.isActive}
									onChange={(e) =>
										setFormData({ ...formData, isActive: e.target.checked })
									}
									className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
								/>
								<span className="text-sm font-medium">Active</span>
							</label>
							<p className="text-xs text-gray-500 mt-1">
								Only active slideshows will be shown on the website
							</p>
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
							{editingId ? "Update Slideshow" : "Create Slideshow"}
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
								Status
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
						{slideshows.map((slideshow) => (
							<tr key={slideshow.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<img
										src={slideshow.imageUrl}
										alt={slideshow.title || "Slideshow"}
										className="h-16 w-24 object-cover rounded-lg border-2 border-gray-200"
									/>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">
										{slideshow.title || "—"}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-2 py-1 text-xs font-semibold rounded ${
											slideshow.isActive
												? "bg-green-100 text-green-800"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{slideshow.isActive ? "Active" : "Inactive"}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
										{slideshow.order}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
									<button
										onClick={() => handleEdit(slideshow)}
										className="text-blue-600 hover:text-blue-900 font-medium"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(slideshow.id)}
										className="text-red-600 hover:text-red-900 font-medium"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{slideshows.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<p className="text-lg font-medium">No slideshows yet</p>
						<p className="mt-1">
							Click "Add New" to create your first slideshow.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
