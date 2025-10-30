/** @format */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const apiClient = {
	// Admin Users
	getAdminUsers: async () => {
		const res = await fetch(`${API_URL}/api/admin/users`);
		if (!res.ok) throw new Error("Failed to fetch admin users");
		return res.json();
	},

	createAdminUser: async (data: any) => {
		const res = await fetch(`${API_URL}/api/admin/users`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.error || "Failed to create admin user");
		}
		return res.json();
	},

	updateAdminUser: async (id: number, data: any) => {
		const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.error || "Failed to update admin user");
		}
		return res.json();
	},

	deleteAdminUser: async (id: number) => {
		const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
			method: "DELETE",
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.error || "Failed to delete admin user");
		}
		return res.json();
	},
	// Achievements
	getAchievements: async () => {
		const res = await fetch(`${API_URL}/api/achievements`, {
			next: { revalidate: 60 },
		});
		if (!res.ok) throw new Error("Failed to fetch achievements");
		return res.json();
	},

	createAchievement: async (data: any) => {
		const res = await fetch(`${API_URL}/api/achievements`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to create achievement");
		return res.json();
	},

	updateAchievement: async (id: number, data: any) => {
		const res = await fetch(`${API_URL}/api/achievements/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to update achievement");
		return res.json();
	},

	deleteAchievement: async (id: number) => {
		const res = await fetch(`${API_URL}/api/achievements/${id}`, {
			method: "DELETE",
		});
		if (!res.ok) throw new Error("Failed to delete achievement");
		return res.json();
	},

	// Slideshows (Banners)
	getSlideshows: async () => {
		const res = await fetch(`${API_URL}/api/slideshows`, {
			next: { revalidate: 60 },
		});
		if (!res.ok) throw new Error("Failed to fetch slideshows");
		return res.json();
	},

	createSlideshow: async (data: any) => {
		const res = await fetch(`${API_URL}/api/slideshows`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to create slideshow");
		return res.json();
	},

	updateSlideshow: async (id: number, data: any) => {
		const res = await fetch(`${API_URL}/api/slideshows/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to update slideshow");
		return res.json();
	},

	deleteSlideshow: async (id: number) => {
		const res = await fetch(`${API_URL}/api/slideshows/${id}`, {
			method: "DELETE",
		});
		if (!res.ok) throw new Error("Failed to delete slideshow");
		return res.json();
	},

	// News
	getNews: async (limit = 10) => {
		const res = await fetch(`${API_URL}/api/news?limit=${limit}`, {
			next: { revalidate: 60 },
		});
		if (!res.ok) throw new Error("Failed to fetch news");
		return res.json();
	},

	createNews: async (data: any) => {
		const res = await fetch(`${API_URL}/api/news`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to create news");
		return res.json();
	},

	updateNews: async (id: number, data: any) => {
		const res = await fetch(`${API_URL}/api/news/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to update news");
		return res.json();
	},

	deleteNews: async (id: number) => {
		const res = await fetch(`${API_URL}/api/news/${id}`, {
			method: "DELETE",
		});
		if (!res.ok) throw new Error("Failed to delete news");
		return res.json();
	},

	// Admission Forms
	getAdmissionForms: async () => {
		const res = await fetch(`${API_URL}/api/admission-forms`);
		if (!res.ok) throw new Error("Failed to fetch admission forms");
		return res.json();
	},

	submitAdmissionForm: async (data: any) => {
		const res = await fetch(`${API_URL}/api/admission-forms`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to submit form");
		return res.json();
	},

	updateAdmissionForm: async (id: number, data: any) => {
		const res = await fetch(`${API_URL}/api/admission-forms/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to update form");
		return res.json();
	},

	// Teacher Applications
	getTeacherApplications: async () => {
		const res = await fetch(`${API_URL}/api/teacher-applications`);
		if (!res.ok) throw new Error("Failed to fetch applications");
		return res.json();
	},

	submitTeacherApplication: async (data: any) => {
		const res = await fetch(`${API_URL}/api/teacher-applications`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to submit application");
		return res.json();
	},

	updateTeacherApplication: async (id: number, data: any) => {
		const res = await fetch(`${API_URL}/api/teacher-applications/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) throw new Error("Failed to update application");
		return res.json();
	},
};
