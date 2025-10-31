/** @format */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Plus,
	Trash2,
	Upload,
	Edit2,
	X,
	AlertCircle,
	CheckCircle,
	Loader,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import ReorderableList from "@/components/admin/ReorderableList";

interface GalleryCategory {
	id: number;
	name: string;
	title: string;
	description: string;
	order: number;
}

interface PlaylistVideo {
	id: number;
	youtubeId: string;
	title: string;
	order: number;
}

export default function GalleryTab() {
	// Gallery Categories State
	const [categories, setCategories] = useState<GalleryCategory[]>([]);
	const [loadingCategories, setLoadingCategories] = useState(true);
	const [editingCategory, setEditingCategory] = useState<number | null>(null);
	const [editTitle, setEditTitle] = useState("");
	const [editDescription, setEditDescription] = useState("");
	const [newCategoryTitle, setNewCategoryTitle] = useState("");
	const [newCategoryDescription, setNewCategoryDescription] = useState("");
	const [imageCounts, setImageCounts] = useState<Record<number, number>>({});

	// Playlists State
	const [playlists, setPlaylists] = useState<PlaylistVideo[]>([]);
	const [loadingPlaylists, setLoadingPlaylists] = useState(true);
	const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);
	const [editPlaylistTitle, setEditPlaylistTitle] = useState("");
	const [editPlaylistId, setEditPlaylistId] = useState("");
	const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
	const [newPlaylistId, setNewPlaylistId] = useState("");

	// Upload State
	const [uploadingCategory, setUploadingCategory] = useState<number | null>(
		null
	);
	const [uploadProgress, setUploadProgress] = useState(0);

	// UI State
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);
	const [deletingId, setDeletingId] = useState<number | null>(null);
	const categoryListRef = useRef<HTMLDivElement>(null);

	// Fetch Categories
	const fetchCategories = async () => {
		try {
			const res = await fetch("/api/admin/gallery");
			if (!res.ok) throw new Error("Failed to fetch categories");
			const data = await res.json();
			setCategories(data.categories);

			// Fetch image counts
			data.categories.forEach((cat: GalleryCategory) => {
				fetchImageCount(cat.id, cat.name);
			});
		} catch (error) {
			setMessage({
				type: "error",
				text: "Failed to load gallery categories",
			});
		} finally {
			setLoadingCategories(false);
		}
	};

	// Fetch Image Count
	const fetchImageCount = async (id: number, name: string) => {
		try {
			const res = await fetch(`/api/admin/gallery/${id}`);
			if (res.ok) {
				const data = await res.json();
				setImageCounts((prev) => ({
					...prev,
					[id]: data.imageCount || 0,
				}));
			}
		} catch (error) {
			console.error("Error fetching image count:", error);
		}
	};

	// Fetch Playlists
	const fetchPlaylists = async () => {
		try {
			const res = await fetch("/api/admin/playlists");
			if (!res.ok) throw new Error("Failed to fetch playlists");
			const data = await res.json();
			setPlaylists(data.playlists);
		} catch (error) {
			setMessage({ type: "error", text: "Failed to load playlists" });
		} finally {
			setLoadingPlaylists(false);
		}
	};

	useEffect(() => {
		fetchCategories();
		fetchPlaylists();
	}, []);

	// Create Category
	const handleCreateCategory = async () => {
		if (!newCategoryTitle.trim()) {
			setMessage({ type: "error", text: "Category title required" });
			return;
		}

		try {
			const res = await fetch("/api/admin/gallery", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: newCategoryTitle,
					title: newCategoryTitle,
					description: newCategoryDescription,
				}),
			});

			if (!res.ok) throw new Error("Failed to create category");

			const data = await res.json();
			setCategories([...categories, data.category]);
			setNewCategoryTitle("");
			setNewCategoryDescription("");
			setMessage({ type: "success", text: "Category created successfully" });
		} catch (error) {
			setMessage({ type: "error", text: "Failed to create category" });
		}
	};

	// Update Category
	const handleUpdateCategory = async (id: number) => {
		try {
			const res = await fetch(`/api/admin/gallery/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: editTitle,
					description: editDescription,
				}),
			});

			if (!res.ok) throw new Error("Failed to update category");

			const data = await res.json();
			setCategories(
				categories.map((cat) => (cat.id === id ? data.category : cat))
			);
			setEditingCategory(null);
			setMessage({ type: "success", text: "Category updated successfully" });
		} catch (error) {
			setMessage({ type: "error", text: "Failed to update category" });
		}
	};

	// Delete Category
	const handleDeleteCategory = async (id: number) => {
		setDeletingId(id);
		try {
			const res = await fetch(`/api/admin/gallery/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Failed to delete category");

			setCategories(categories.filter((cat) => cat.id !== id));
			setImageCounts((prev) => {
				const newCounts = { ...prev };
				delete newCounts[id];
				return newCounts;
			});
			setMessage({
				type: "success",
				text: "Category and all images deleted",
			});
		} catch (error) {
			setMessage({ type: "error", text: "Failed to delete category" });
		} finally {
			setDeletingId(null);
		}
	};

	// Reorder Categories
	const handleReorderCategories = async (reorderedItems: GalleryCategory[]) => {
		try {
			const res = await fetch("/api/admin/gallery", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ categories: reorderedItems }),
			});

			if (!res.ok) throw new Error("Failed to reorder categories");

			setCategories(reorderedItems);
			setMessage({ type: "success", text: "Categories reordered" });
		} catch (error) {
			setMessage({ type: "error", text: "Failed to reorder categories" });
			fetchCategories(); // Revert on error
		}
	};

	// Create Playlist
	const handleCreatePlaylist = async () => {
		if (!newPlaylistTitle.trim() || !newPlaylistId.trim()) {
			setMessage({ type: "error", text: "Title and YouTube ID required" });
			return;
		}

		try {
			const res = await fetch("/api/admin/playlists", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: newPlaylistTitle,
					youtubeId: newPlaylistId,
				}),
			});

			if (!res.ok) throw new Error("Failed to create playlist");

			const data = await res.json();
			setPlaylists([...playlists, data.playlist]);
			setNewPlaylistTitle("");
			setNewPlaylistId("");
			setMessage({ type: "success", text: "Playlist created successfully" });
		} catch (error) {
			setMessage({ type: "error", text: "Failed to create playlist" });
		}
	};

	// Update Playlist
	const handleUpdatePlaylist = async (id: number) => {
		try {
			const res = await fetch(`/api/admin/playlists/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: editPlaylistTitle,
					youtubeId: editPlaylistId,
				}),
			});

			if (!res.ok) throw new Error("Failed to update playlist");

			const data = await res.json();
			setPlaylists(playlists.map((p) => (p.id === id ? data.playlist : p)));
			setEditingPlaylist(null);
			setMessage({ type: "success", text: "Playlist updated successfully" });
		} catch (error) {
			setMessage({ type: "error", text: "Failed to update playlist" });
		}
	};

	// Delete Playlist
	const handleDeletePlaylist = async (id: number) => {
		setDeletingId(id);
		try {
			const res = await fetch(`/api/admin/playlists/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Failed to delete playlist");

			setPlaylists(playlists.filter((p) => p.id !== id));
			setMessage({ type: "success", text: "Playlist deleted successfully" });
		} catch (error) {
			setMessage({ type: "error", text: "Failed to delete playlist" });
		} finally {
			setDeletingId(null);
		}
	};

	// Reorder Playlists
	const handleReorderPlaylists = async (reorderedItems: PlaylistVideo[]) => {
		try {
			const res = await fetch("/api/admin/playlists", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ playlists: reorderedItems }),
			});

			if (!res.ok) throw new Error("Failed to reorder playlists");

			setPlaylists(reorderedItems);
			setMessage({ type: "success", text: "Playlists reordered" });
		} catch (error) {
			setMessage({ type: "error", text: "Failed to reorder playlists" });
			fetchPlaylists(); // Revert on error
		}
	};

	return (
		<div className="space-y-8">
			{/* Messages */}
			<AnimatePresence>
				{message && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className={`flex items-center gap-3 p-4 rounded-lg ${
							message.type === "success"
								? "bg-green-50 border border-green-200"
								: "bg-red-50 border border-red-200"
						}`}
					>
						{message.type === "success" ? (
							<CheckCircle className="w-5 h-5 text-green-600" />
						) : (
							<AlertCircle className="w-5 h-5 text-red-600" />
						)}
						<p
							className={
								message.type === "success" ? "text-green-800" : "text-red-800"
							}
						>
							{message.text}
						</p>
						<button
							onClick={() => setMessage(null)}
							className="ml-auto text-gray-500 hover:text-gray-700"
						>
							<X className="w-4 h-4" />
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Gallery Categories Section */}
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h3 className="text-2xl font-bold text-gray-900">
						Image Gallery Categories
					</h3>
				</div>

				{/* Create New Category */}
				<div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
					<h4 className="font-semibold text-gray-900">Add New Category</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="Category title"
							value={newCategoryTitle}
							onChange={(e) => setNewCategoryTitle(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
						/>
						<input
							type="text"
							placeholder="Description"
							value={newCategoryDescription}
							onChange={(e) => setNewCategoryDescription(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
						/>
					</div>
					<button
						onClick={handleCreateCategory}
						className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
					>
						<Plus className="w-4 h-4" />
						Create Category
					</button>
				</div>

				{/* Categories List */}
				{loadingCategories ? (
					<div className="flex justify-center py-8">
						<Loader className="w-6 h-6 animate-spin text-red-600" />
					</div>
				) : categories.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						No categories yet. Create one above.
					</div>
				) : (
					<ReorderableList
						items={categories}
						onReorder={handleReorderCategories}
						ref={categoryListRef}
					>
						{(category) => (
							<div className="flex items-center justify-between w-full">
								<div className="flex-grow">
									{editingCategory === category.id ? (
										<div className="space-y-2">
											<input
												type="text"
												value={editTitle}
												onChange={(e) => setEditTitle(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
											/>
											<input
												type="text"
												value={editDescription}
												onChange={(e) => setEditDescription(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
											/>
										</div>
									) : (
										<div>
											<h4 className="font-semibold text-gray-900">
												{category.title}
											</h4>
											<p className="text-sm text-gray-500">
												{category.description}
											</p>
											<p className="text-xs text-gray-400 mt-1">
												{imageCounts[category.id] || 0} images • Folder:{" "}
												<span className="font-mono">{category.name}</span>
											</p>
										</div>
									)}
								</div>

								{editingCategory === category.id ? (
									<div className="flex items-center gap-2">
										<button
											onClick={() => handleUpdateCategory(category.id)}
											className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
										>
											Save
										</button>
										<button
											onClick={() => setEditingCategory(null)}
											className="px-3 py-1 bg-gray-400 text-white text-sm rounded hover:bg-gray-500 transition"
										>
											Cancel
										</button>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<CldUploadWidget
											uploadPreset={
												process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
												"ml_default"
											}
											options={{
												folder: `sarvodayaGallery/${category.name}`,
												multiple: true,
												maxFiles: 50,
												resourceType: "image",
												clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
												maxFileSize: 10000000,
											}}
											onSuccess={() => {
												setTimeout(
													() => fetchImageCount(category.id, category.name),
													1000
												);
												setMessage({
													type: "success",
													text: "Images uploaded successfully",
												});
											}}
											onError={() => {
												setMessage({
													type: "error",
													text: "Upload failed",
												});
											}}
										>
											{({ open }) => (
												<button
													onClick={() => open()}
													className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
												>
													<Upload className="w-4 h-4" />
													Upload
												</button>
											)}
										</CldUploadWidget>

										<button
											onClick={() => {
												setEditingCategory(category.id);
												setEditTitle(category.title);
												setEditDescription(category.description);
											}}
											className="flex items-center gap-2 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition"
										>
											<Edit2 className="w-4 h-4" />
										</button>

										<button
											onClick={() => handleDeleteCategory(category.id)}
											disabled={deletingId === category.id}
											className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition disabled:bg-gray-400"
										>
											{deletingId === category.id ? (
												<Loader className="w-4 h-4 animate-spin" />
											) : (
												<Trash2 className="w-4 h-4" />
											)}
										</button>
									</div>
								)}
							</div>
						)}
					</ReorderableList>
				)}
			</div>

			{/* Video Playlists Section */}
			<div className="space-y-6 border-t pt-8">
				<div className="flex items-center justify-between">
					<h3 className="text-2xl font-bold text-gray-900">Video Playlists</h3>
				</div>

				{/* Create New Playlist */}
				<div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
					<h4 className="font-semibold text-gray-900">Add New Playlist</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="Playlist title"
							value={newPlaylistTitle}
							onChange={(e) => setNewPlaylistTitle(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
						/>
						<input
							type="text"
							placeholder="YouTube Playlist ID"
							value={newPlaylistId}
							onChange={(e) => setNewPlaylistId(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
						/>
					</div>
					<p className="text-sm text-gray-500">
						Playlist ID example: PLLNvFiU5ntQd5nwiHP3Y8F5WKM4ywa11-
					</p>
					<button
						onClick={handleCreatePlaylist}
						className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
					>
						<Plus className="w-4 h-4" />
						Create Playlist
					</button>
				</div>

				{/* Playlists List */}
				{loadingPlaylists ? (
					<div className="flex justify-center py-8">
						<Loader className="w-6 h-6 animate-spin text-red-600" />
					</div>
				) : playlists.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						No playlists yet. Create one above.
					</div>
				) : (
					<ReorderableList items={playlists} onReorder={handleReorderPlaylists}>
						{(playlist) => (
							<div className="flex items-center justify-between w-full">
								<div className="flex-grow">
									{editingPlaylist === playlist.id ? (
										<div className="space-y-2">
											<input
												type="text"
												value={editPlaylistTitle}
												onChange={(e) => setEditPlaylistTitle(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
											/>
											<input
												type="text"
												value={editPlaylistId}
												onChange={(e) => setEditPlaylistId(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
											/>
										</div>
									) : (
										<div>
											<h4 className="font-semibold text-gray-900">
												{playlist.title}
											</h4>
											<p className="text-xs text-gray-400 mt-1">
												ID:{" "}
												<span className="font-mono">{playlist.youtubeId}</span>
											</p>
										</div>
									)}
								</div>

								{editingPlaylist === playlist.id ? (
									<div className="flex items-center gap-2">
										<button
											onClick={() => handleUpdatePlaylist(playlist.id)}
											className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
										>
											Save
										</button>
										<button
											onClick={() => setEditingPlaylist(null)}
											className="px-3 py-1 bg-gray-400 text-white text-sm rounded hover:bg-gray-500 transition"
										>
											Cancel
										</button>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<button
											onClick={() => {
												setEditingPlaylist(playlist.id);
												setEditPlaylistTitle(playlist.title);
												setEditPlaylistId(playlist.youtubeId);
											}}
											className="flex items-center gap-2 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition"
										>
											<Edit2 className="w-4 h-4" />
										</button>

										<button
											onClick={() => handleDeletePlaylist(playlist.id)}
											disabled={deletingId === playlist.id}
											className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition disabled:bg-gray-400"
										>
											{deletingId === playlist.id ? (
												<Loader className="w-4 h-4 animate-spin" />
											) : (
												<Trash2 className="w-4 h-4" />
											)}
										</button>
									</div>
								)}
							</div>
						)}
					</ReorderableList>
				)}
			</div>
		</div>
	);
}
