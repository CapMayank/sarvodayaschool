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
			setNews(data);
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
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
				>
					{isAdding ? "Cancel" : "Add New"}
				</button>
			</div>

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
						</div>
						<button
							type="submit"
							className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
						>
							{editingId ? "Update News" : "Create News"}
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
								Category
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Publish Date
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{news.map((newsItem) => (
							<tr key={newsItem.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									{newsItem.imageUrl ? (
										<img
											src={newsItem.imageUrl}
											alt={newsItem.title}
											className="h-16 w-20 object-cover rounded-lg border"
										/>
									) : (
										<div className="h-16 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
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
								</td>
								<td className="px-6 py-4">
									<div className="max-w-md">
										<div className="font-medium text-gray-900">
											{newsItem.title}
										</div>
										<div className="text-sm text-gray-500 truncate">
											{newsItem.content.substring(0, 60)}...
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
										{newsItem.category}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm">
									{new Date(newsItem.publishDate).toLocaleDateString()}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
									<button
										onClick={() => handleEdit(newsItem)}
										className="text-blue-600 hover:text-blue-900 font-medium"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(newsItem.id)}
										className="text-red-600 hover:text-red-900 font-medium"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{news.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<p className="text-lg font-medium">No news items yet</p>
						<p className="mt-1">Click "Add New" to create one.</p>
					</div>
				)}
			</div>
		</div>
	);
}
