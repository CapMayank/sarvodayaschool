/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { deleteCloudinaryImage } from "@/lib/cloudinary-helper";

export default function NewsTab() {
	const [news, setNews] = useState<any[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		imageUrl: "",
		category: "General",
		publishDate: new Date().toISOString().split("T")[0],
	});

	useEffect(() => {
		loadNews();
	}, []);

	const loadNews = async () => {
		try {
			const data = await apiClient.getNews(100);
			// Sort by publishDate in descending order (most recent first)
			const sortedNews = data.sort(
				(a: any, b: any) =>
					new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
			);
			setNews(sortedNews);
		} catch (error) {
			console.error("Error loading news:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (editingId) {
				await apiClient.updateNews(editingId, formData);
			} else {
				await apiClient.createNews(formData);
			}
			setFormData({
				title: "",
				content: "",
				imageUrl: "",
				category: "General",
				publishDate: new Date().toISOString().split("T")[0],
			});
			setIsAdding(false);
			setEditingId(null);
			loadNews();
		} catch (error) {
			console.error("Error saving news:", error);
			alert("Failed to save news");
		}
	};

	const handleEdit = (newsItem: any) => {
		setFormData({
			title: newsItem.title,
			content: newsItem.content,
			imageUrl: newsItem.imageUrl || "",
			category: newsItem.category,
			publishDate: new Date(newsItem.publishDate).toISOString().split("T")[0],
		});
		setEditingId(newsItem.id);
		setIsAdding(true);
	};

	const handleDelete = async (id: number) => {
		const newsItem = news.find((n) => n.id === id);

		if (!confirm("Are you sure you want to delete this news item?")) return;

		try {
			// Delete from database first
			await apiClient.deleteNews(id);

			// Then delete image from Cloudinary (if exists)
			if (newsItem?.imageUrl) {
				const deleted = await deleteCloudinaryImage(newsItem.imageUrl);
				if (!deleted) {
					console.warn(
						"Database entry deleted but Cloudinary image deletion failed"
					);
				}
			}

			loadNews();
		} catch (error) {
			console.error("Error deleting news:", error);
			alert("Failed to delete news");
		}
	};

	return (
		<div>
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Manage News</h2>
				<button
					onClick={() => {
						setIsAdding(!isAdding);
						setEditingId(null);
						setFormData({
							title: "",
							content: "",
							imageUrl: "",
							category: "General",
							publishDate: new Date().toISOString().split("T")[0],
						});
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
						{editingId ? "Edit News" : "Add New News"}
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
								placeholder="Enter news title"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Content</label>
							<textarea
								value={formData.content}
								onChange={(e) =>
									setFormData({ ...formData, content: e.target.value })
								}
								className="w-full p-2 border rounded"
								rows={5}
								placeholder="Enter news content"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Image (Optional)
							</label>
							<CloudinaryUpload
								currentImage={formData.imageUrl}
								folder="sarvodaya/news"
								onUploadSuccess={(url) =>
									setFormData({ ...formData, imageUrl: url })
								}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Category</label>
							<select
								value={formData.category}
								onChange={(e) =>
									setFormData({ ...formData, category: e.target.value })
								}
								className="w-full p-2 border rounded"
							>
								<option value="General">General</option>
								<option value="Announcement">Announcement</option>
								<option value="Event">Event</option>
								<option value="Achievement">Achievement</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Publish Date
							</label>
							<input
								type="date"
								value={formData.publishDate}
								onChange={(e) =>
									setFormData({ ...formData, publishDate: e.target.value })
								}
								className="w-full p-2 border rounded"
								required
							/>
							<p className="text-xs text-gray-500 mt-1">
								News will be displayed sorted by most recent date first
							</p>
						</div>
						<button
							type="submit"
							className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
						>
							{editingId ? "Update News" : "Create News"}
						</button>
					</form>
				</div>
			)}

			{/* List Section */}
			<div className="bg-white rounded-lg shadow p-6">
				{news.length > 0 && (
					<div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
						<p className="text-sm text-blue-800">
							📅 <strong>Sorted by publish date</strong> - Most recent first
						</p>
					</div>
				)}

				{news.length === 0 ? (
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
								d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v11a2 2 0 01-2 2zM13 5H9m0 0v4m0-4h4"
							/>
						</svg>
						<p className="text-lg font-medium">No news items yet</p>
						<p className="mt-1">Click "Add New" to create one.</p>
					</div>
				) : (
					<div className="space-y-3">
						{news.map((newsItem, index) => (
							<div
								key={newsItem.id}
								className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
							>
								<div className="flex items-start gap-4">
									{/* Image */}
									{newsItem.imageUrl ? (
										<img
											src={newsItem.imageUrl}
											alt={newsItem.title}
											className="h-16 w-24 object-cover rounded-lg border border-gray-200 flex-shrink-0"
										/>
									) : (
										<div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
											<svg
												className="w-8 h-8 text-gray-400"
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
										</div>
									)}

									{/* Content */}
									<div className="flex-grow min-w-0">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-grow">
												<div className="font-semibold text-gray-900 text-lg">
													{newsItem.title}
												</div>
												<div className="text-sm text-gray-600 mt-1 line-clamp-2">
													{newsItem.content}
												</div>
												<div className="flex items-center gap-3 mt-3 flex-wrap">
													<span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 font-medium">
														{newsItem.category}
													</span>
													<span className="text-xs text-gray-500 font-medium">
														📅{" "}
														{new Date(newsItem.publishDate).toLocaleDateString(
															"en-IN",
															{
																year: "numeric",
																month: "short",
																day: "numeric",
															}
														)}
													</span>
													{index === 0 && (
														<span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 font-medium">
															📌 Most Recent
														</span>
													)}
												</div>
											</div>

											{/* Actions */}
											<div className="flex gap-2 flex-shrink-0">
												<button
													onClick={() => handleEdit(newsItem)}
													className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
												>
													Edit
												</button>
												<button
													onClick={() => handleDelete(newsItem.id)}
													className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors whitespace-nowrap"
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
