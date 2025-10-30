/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { deleteCloudinaryImage } from "@/lib/cloudinary-helper";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import ReorderableList from "@/components/admin/ReorderableList";

export default function SlideshowsTab() {
	const [slideshows, setSlideshows] = useState<any[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isReordering, setIsReordering] = useState(false);
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

	const handleReorder = async (reorderedItems: any[]) => {
		setIsReordering(true);
		try {
			// Update all items with new order
			for (const item of reorderedItems) {
				await apiClient.updateSlideshow(item.id, {
					title: item.title,
					imageUrl: item.imageUrl,
					isActive: item.isActive,
					order: item.order,
				});
			}
			setSlideshows(reorderedItems);
			alert("Order updated successfully!");
		} catch (error) {
			console.error("Error reordering:", error);
			alert("Failed to update order");
			loadSlideshows(); // Reload on error
		} finally {
			setIsReordering(false);
		}
	};

	return (
		<div>
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Manage Slideshows (Banners)</h2>
				<button
					onClick={() => {
						setIsAdding(!isAdding);
						setEditingId(null);
						setFormData({ title: "", imageUrl: "", isActive: true, order: 0 });
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
								placeholder="Enter banner title"
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
						<button
							type="submit"
							disabled={!formData.imageUrl || isReordering}
							className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{editingId ? "Update Slideshow" : "Create Slideshow"}
						</button>
					</form>
				</div>
			)}

			{/* List Section */}
			<div className="bg-white rounded-lg shadow p-6">
				{slideshows.length > 0 && (
					<div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
						<p className="text-sm text-blue-800">
							💡 <strong>Drag items to reorder them.</strong> Changes are saved
							automatically.
						</p>
					</div>
				)}

				{slideshows.length === 0 ? (
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
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<p className="text-lg font-medium">No slideshows yet</p>
						<p className="mt-1">
							Click "Add New" to create your first slideshow.
						</p>
					</div>
				) : (
					<ReorderableList items={slideshows} onReorder={handleReorder}>
						{(item, index) => (
							<div className="flex items-center justify-between w-full">
								<div className="flex items-start gap-4 flex-grow">
									{/* Image */}
									<img
										src={item.imageUrl}
										alt={item.title || "Slideshow"}
										className="h-14 w-24 object-cover rounded-lg border border-gray-200 flex-shrink-0"
									/>

									{/* Content */}
									<div className="flex-grow min-w-0">
										<div className="font-medium text-gray-900 truncate">
											{item.title || "Untitled Banner"}
										</div>
										<div className="text-xs text-gray-500 mt-2 space-y-1">
											<div>
												Status:{" "}
												<span
													className={`font-medium px-2 py-0.5 rounded ${
														item.isActive
															? "bg-green-100 text-green-800"
															: "bg-gray-100 text-gray-800"
													}`}
												>
													{item.isActive ? "Active" : "Inactive"}
												</span>
											</div>
											<div>
												Position:{" "}
												<span className="bg-gray-100 px-2 py-0.5 rounded font-medium">
													#{index + 1}
												</span>
											</div>
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
