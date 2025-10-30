/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useSession } from "next-auth/react";

export default function UsersTab() {
	const [users, setUsers] = useState<any[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { data: session } = useSession();

	useEffect(() => {
		loadUsers();
	}, []);

	const loadUsers = async () => {
		try {
			const data = await apiClient.getAdminUsers();
			setUsers(data);
		} catch (error) {
			console.error("Error loading users:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (editingId) {
				// Update user (password optional)
				await apiClient.updateAdminUser(editingId, formData);
			} else {
				// Create user (password required)
				if (!formData.password) {
					alert("Password is required for new users");
					return;
				}
				await apiClient.createAdminUser(formData);
			}

			setFormData({ name: "", email: "", password: "" });
			setIsAdding(false);
			setEditingId(null);
			loadUsers();
		} catch (error: any) {
			console.error("Error saving user:", error);
			alert(error.message || "Failed to save user");
		}
	};

	const handleEdit = (user: any) => {
		setFormData({
			name: user.name,
			email: user.email,
			password: "", // Don't populate password
		});
		setEditingId(user.id);
		setIsAdding(true);
	};

	const handleDelete = async (id: number) => {
		if (users.length <= 1) {
			alert("Cannot delete the last admin user");
			return;
		}

		if (!confirm("Are you sure you want to delete this admin user?")) return;

		try {
			await apiClient.deleteAdminUser(id);
			loadUsers();
		} catch (error: any) {
			console.error("Error deleting user:", error);
			alert(error.message || "Failed to delete user");
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Manage Admin Users</h2>
				<button
					onClick={() => {
						setIsAdding(!isAdding);
						setEditingId(null);
						setFormData({ name: "", email: "", password: "" });
					}}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
				>
					{isAdding ? "Cancel" : "Add New User"}
				</button>
			</div>

			{isAdding && (
				<div className="bg-white p-6 rounded-lg shadow mb-6">
					<h3 className="text-lg font-semibold mb-4">
						{editingId ? "Edit Admin User" : "Add New Admin User"}
					</h3>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">Name</label>
							<input
								type="text"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								className="w-full p-2 border rounded"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Email</label>
							<input
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className="w-full p-2 border rounded"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Password {editingId && "(leave blank to keep current)"}
							</label>
							<input
								type="password"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								className="w-full p-2 border rounded"
								placeholder={
									editingId ? "Leave blank to keep current" : "Min 6 characters"
								}
								minLength={6}
								required={!editingId}
							/>
						</div>
						<button
							type="submit"
							className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
						>
							{editingId ? "Update User" : "Create User"}
						</button>
					</form>
				</div>
			)}

			<div className="bg-white rounded-lg shadow overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Created
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="font-medium text-gray-900">{user.name}</div>
									{session?.user?.email === user.email && (
										<span className="text-xs text-blue-600">(You)</span>
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-gray-600">
									{user.email}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{new Date(user.createdAt).toLocaleDateString()}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
									<button
										onClick={() => handleEdit(user)}
										className="text-blue-600 hover:text-blue-900 font-medium"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(user.id)}
										disabled={users.length <= 1}
										className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{users.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<p className="text-lg font-medium">No admin users found</p>
					</div>
				)}
			</div>
		</div>
	);
}
