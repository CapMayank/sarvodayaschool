/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { deleteCloudinaryFile } from "@/lib/cloudinary-helper";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Trash2, FileText, ChevronRight } from "lucide-react";

export default function TeachersTab() {
	const [applications, setApplications] = useState<any[]>([]);
	const [selectedApp, setSelectedApp] = useState<any>(null);
	const [showModal, setShowModal] = useState(false);
	const [showPDFModal, setShowPDFModal] = useState(false);
	const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
	const [filterStatus, setFilterStatus] = useState<string>("All");
	const [statusNotes, setStatusNotes] = useState<string>("");

	useEffect(() => {
		loadApplications();
	}, []);

	const loadApplications = async () => {
		try {
			const data = await apiClient.getTeacherApplications();
			setApplications(data);
		} catch (error) {
			console.error("Error loading applications:", error);
		}
	};

	const updateStatus = async (id: number, status: string, notes: string) => {
		try {
			await apiClient.updateTeacherApplication(id, { status, notes });
			setStatusNotes("");
			loadApplications();
		} catch (error) {
			console.error("Error updating application:", error);
			alert("Failed to update status");
		}
	};

	const handleDelete = async (id: number) => {
		const app = applications.find((a) => a.id === id);

		if (
			!confirm(
				"Are you sure you want to delete this application? This action cannot be undone."
			)
		)
			return;

		try {
			await fetch(`/api/teacher-applications/${id}`, {
				method: "DELETE",
			});

			if (app?.resumeUrl) {
				const deleted = await deleteCloudinaryFile(app.resumeUrl);
				if (!deleted) {
					console.warn("Database entry deleted but resume deletion failed");
				}
			}

			setShowModal(false);
			loadApplications();
			alert("Application deleted successfully");
		} catch (error) {
			console.error("Error deleting application:", error);
			alert("Failed to delete application");
		}
	};

	const viewDetails = (app: any) => {
		setSelectedApp(app);
		setStatusNotes(app.notes || "");
		setShowModal(true);
	};

	const openPDF = (pdfUrl: string) => {
		setSelectedPDF(pdfUrl);
		setShowPDFModal(true);
	};

	// Filter applications by status
	const filteredApps =
		filterStatus === "All"
			? applications
			: applications.filter((app) => app.status === filterStatus);

	// Status counts
	const statusCounts = {
		All: applications.length,
		New: applications.filter((a) => a.status === "New").length,
		Shortlisted: applications.filter((a) => a.status === "Shortlisted").length,
		"Interview Scheduled": applications.filter(
			(a) => a.status === "Interview Scheduled"
		).length,
		Hired: applications.filter((a) => a.status === "Hired").length,
		Rejected: applications.filter((a) => a.status === "Rejected").length,
	};

	// Status badge colors
	const getStatusColor = (status: string) => {
		switch (status) {
			case "New":
				return "bg-blue-100 text-blue-800";
			case "Shortlisted":
				return "bg-purple-100 text-purple-800";
			case "Interview Scheduled":
				return "bg-yellow-100 text-yellow-800";
			case "Hired":
				return "bg-green-100 text-green-800";
			case "Rejected":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div>
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-3xl font-bold text-gray-900">
							Teacher Applications
						</h2>
						<p className="text-gray-600 mt-1">
							Manage and review all teacher applications
						</p>
					</div>
					<div className="text-right">
						<div className="text-3xl font-bold text-red-600">
							{applications.length}
						</div>
						<div className="text-sm text-gray-600">Total Applications</div>
					</div>
				</div>

				{/* Filter Pills */}
				<div className="flex flex-wrap gap-2">
					{[
						"All",
						"New",
						"Shortlisted",
						"Interview Scheduled",
						"Hired",
						"Rejected",
					].map((status) => (
						<motion.button
							key={status}
							onClick={() => setFilterStatus(status)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
								filterStatus === status
									? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{status}{" "}
							<span
								className={`ml-1 font-semibold ${
									filterStatus === status ? "text-red-100" : "text-gray-600"
								}`}
							>
								({statusCounts[status as keyof typeof statusCounts]})
							</span>
						</motion.button>
					))}
				</div>
			</div>

			{/* Table Container */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				{/* Desktop Table View */}
				<div className="hidden lg:block">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Name & Gender
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Subject & Class
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Experience
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Contact
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Resume
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Applied
									</th>
									<th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								<AnimatePresence>
									{filteredApps.map((app) => (
										<motion.tr
											key={app.id}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="hover:bg-red-50 transition-colors group"
										>
											<td className="px-6 py-4">
												<div className="font-semibold text-gray-900">
													{app.name}
												</div>
												<div className="text-sm text-gray-600">
													{app.gender}
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="font-medium text-gray-900">
													{app.subject}
												</div>
												<div className="text-sm text-gray-600">
													Class {app.class}
												</div>
											</td>
											<td className="px-6 py-4">
												<span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm">
													{app.experience} yrs
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-700">
												{app.mobileNumber}
											</td>
											<td className="px-6 py-4">
												{app.resumeUrl ? (
													<button
														onClick={() => openPDF(app.resumeUrl)}
														className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 font-medium text-sm transition-colors"
													>
														<FileText size={16} />
														View
													</button>
												) : (
													<span className="text-gray-400 text-sm">—</span>
												)}
											</td>
											<td className="px-6 py-4">
												<span
													className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
														app.status
													)}`}
												>
													{app.status}
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{new Date(app.createdAt).toLocaleDateString("en-IN", {
													month: "short",
													day: "numeric",
													year: "2-digit",
												})}
											</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													<motion.button
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => viewDetails(app)}
														className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 font-medium text-sm transition-colors"
													>
														<Eye size={16} />
														View
													</motion.button>
													<motion.button
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => {
															if (confirm("Delete this application?")) {
																handleDelete(app.id);
															}
														}}
														className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 font-medium text-sm transition-colors"
													>
														<Trash2 size={16} />
														Delete
													</motion.button>
												</div>
											</td>
										</motion.tr>
									))}
								</AnimatePresence>
							</tbody>
						</table>
					</div>
				</div>

				{/* Mobile Card View */}
				<div className="lg:hidden divide-y divide-gray-200">
					<AnimatePresence>
						{filteredApps.map((app) => (
							<motion.div
								key={app.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="p-4 hover:bg-gray-50 transition-colors"
							>
								<div className="space-y-3">
									{/* Header Row */}
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3 className="font-semibold text-gray-900 text-lg">
												{app.name}
											</h3>
											<p className="text-sm text-gray-600">{app.gender}</p>
										</div>
										<span
											className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
												app.status
											)}`}
										>
											{app.status}
										</span>
									</div>

									{/* Info Grid */}
									<div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-200">
										<div>
											<p className="text-xs text-gray-600 font-medium">
												Subject
											</p>
											<p className="font-medium text-gray-900">{app.subject}</p>
										</div>
										<div>
											<p className="text-xs text-gray-600 font-medium">Class</p>
											<p className="font-medium text-gray-900">
												Class {app.class}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-600 font-medium">
												Experience
											</p>
											<p className="font-medium text-gray-900">
												{app.experience} years
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-600 font-medium">
												Mobile
											</p>
											<p className="font-medium text-gray-900">
												{app.mobileNumber}
											</p>
										</div>
									</div>

									{/* Resume & Date */}
									<div className="flex items-center justify-between text-sm">
										<p className="text-gray-600">
											Applied:{" "}
											<span className="font-medium">
												{new Date(app.createdAt).toLocaleDateString("en-IN")}
											</span>
										</p>
										{app.resumeUrl && (
											<button
												onClick={() => openPDF(app.resumeUrl)}
												className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1"
											>
												<FileText size={16} />
												PDF
											</button>
										)}
									</div>

									{/* Actions */}
									<div className="flex gap-2 pt-2">
										<motion.button
											whileTap={{ scale: 0.95 }}
											onClick={() => viewDetails(app)}
											className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium text-sm transition-colors"
										>
											<Eye size={16} />
											View Details
										</motion.button>
										<motion.button
											whileTap={{ scale: 0.95 }}
											onClick={() => {
												if (confirm("Delete this application?")) {
													handleDelete(app.id);
												}
											}}
											className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium text-sm transition-colors"
										>
											<Trash2 size={16} />
										</motion.button>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{/* Empty State */}
				{filteredApps.length === 0 && (
					<div className="text-center py-16 px-4">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
							<FileText className="text-gray-400" size={32} />
						</div>
						<p className="text-lg font-semibold text-gray-900">
							No applications found
						</p>
						<p className="text-gray-600 mt-1">
							{filterStatus === "All"
								? "Applications will appear here when submitted."
								: `No ${filterStatus} applications yet.`}
						</p>
					</div>
				)}
			</div>

			{/* PDF Viewer Modal */}
			<AnimatePresence>
				{showPDFModal && selectedPDF && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col shadow-xl"
						>
							{/* Header */}
							<div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
								<h3 className="text-lg font-semibold text-gray-900">Resume</h3>
								<button
									onClick={() => setShowPDFModal(false)}
									className="text-gray-500 hover:text-gray-700 transition-colors"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							{/* PDF Viewer */}
							<div className="flex-1 overflow-hidden bg-gray-100">
								<iframe
									src={`${selectedPDF}#toolbar=1&navpanes=0`}
									className="w-full h-full border-none"
									title="Resume PDF"
									style={{ height: "100%" }}
								/>
							</div>

							{/* Footer */}
							<div className="flex justify-between items-center p-4 border-t bg-gray-50 flex-shrink-0">
								<p className="text-sm text-gray-600">Resume viewer</p>
								<div className="space-x-2">
									<a
										href={selectedPDF}
										download="resume.pdf"
										className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block font-medium text-sm transition-colors"
									>
										Download
									</a>
									<a
										href={selectedPDF}
										target="_blank"
										rel="noopener noreferrer"
										className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-block font-medium text-sm transition-colors"
									>
										Open in New Tab
									</a>
									<button
										onClick={() => setShowPDFModal(false)}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium text-sm transition-colors"
									>
										Close
									</button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Details Modal */}
			<AnimatePresence>
				{showModal && selectedApp && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
						>
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-2xl font-bold text-gray-900">
									Application Details
								</h3>
								<button
									onClick={() => setShowModal(false)}
									className="text-gray-500 hover:text-gray-700 transition-colors"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<div className="space-y-6">
								{/* Status Section */}
								<div className="bg-gradient-to-br from-red-50 to-red-50/50 p-4 rounded-lg border border-red-200">
									<label className="block text-sm font-semibold text-gray-900 mb-3">
										Application Status
									</label>
									<select
										value={selectedApp.status}
										onChange={(e) =>
											setSelectedApp({
												...selectedApp,
												status: e.target.value,
											})
										}
										className="w-full p-2.5 border border-gray-300 rounded-lg mb-3 font-medium text-gray-900"
									>
										<option value="New">New</option>
										<option value="Shortlisted">Shortlisted</option>
										<option value="Interview Scheduled">
											Interview Scheduled
										</option>
										<option value="Hired">Hired</option>
										<option value="Rejected">Rejected</option>
									</select>
									<span
										className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
											selectedApp.status
										)}`}
									>
										{selectedApp.status}
									</span>
								</div>

								{/* Resume Section */}
								{selectedApp.resumeUrl && (
									<div className="bg-gradient-to-br from-green-50 to-green-50/50 p-4 rounded-lg border border-green-200">
										<h4 className="font-semibold text-gray-900 mb-3">Resume</h4>
										<div className="flex gap-2 flex-wrap">
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => openPDF(selectedApp.resumeUrl)}
												className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
											>
												<FileText size={18} />
												View Resume
											</motion.button>
											<a
												href={selectedApp.resumeUrl}
												download="resume.pdf"
												className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium px-4 py-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
											>
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
													/>
												</svg>
												Download
											</a>
										</div>
									</div>
								)}

								{/* Personal Information */}
								<div className="bg-white border border-gray-200 rounded-lg p-4">
									<h4 className="font-semibold text-gray-900 mb-4">
										Personal Information
									</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Name
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.name}
											</p>
										</div>
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Gender
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.gender}
											</p>
										</div>
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Mobile Number
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.mobileNumber}
											</p>
										</div>
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Experience
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.experience} years
											</p>
										</div>
									</div>
								</div>

								{/* Professional Information */}
								<div className="bg-white border border-gray-200 rounded-lg p-4">
									<h4 className="font-semibold text-gray-900 mb-4">
										Professional Information
									</h4>
									<div className="space-y-3">
										<div className="grid grid-cols-2 gap-4">
											<div className="border-l-2 border-red-500 pl-3">
												<p className="text-xs font-medium text-gray-600 uppercase">
													Subject
												</p>
												<p className="font-semibold text-gray-900">
													{selectedApp.subject}
												</p>
											</div>
											<div className="border-l-2 border-red-500 pl-3">
												<p className="text-xs font-medium text-gray-600 uppercase">
													Class
												</p>
												<p className="font-semibold text-gray-900">
													{selectedApp.class}
												</p>
											</div>
										</div>
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Qualifications
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.qualifications}
											</p>
										</div>
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Specialization
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.specialization}
											</p>
										</div>
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Professional Qualification
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.professionalQualification}
											</p>
										</div>
										{selectedApp.otherProfessionalQualification && (
											<div className="border-l-2 border-red-500 pl-3">
												<p className="text-xs font-medium text-gray-600 uppercase">
													Other Professional Qualification
												</p>
												<p className="font-semibold text-gray-900">
													{selectedApp.otherProfessionalQualification}
												</p>
											</div>
										)}
									</div>
								</div>

								{/* Location Information */}
								<div className="bg-white border border-gray-200 rounded-lg p-4">
									<h4 className="font-semibold text-gray-900 mb-4">
										Location Information
									</h4>
									<div className="space-y-3">
										<div className="grid grid-cols-2 gap-4">
											<div className="border-l-2 border-red-500 pl-3">
												<p className="text-xs font-medium text-gray-600 uppercase">
													District
												</p>
												<p className="font-semibold text-gray-900">
													{selectedApp.district}
												</p>
											</div>
											<div className="border-l-2 border-red-500 pl-3">
												<p className="text-xs font-medium text-gray-600 uppercase">
													Block
												</p>
												<p className="font-semibold text-gray-900">
													{selectedApp.block}
												</p>
											</div>
										</div>
										<div className="border-l-2 border-red-500 pl-3">
											<p className="text-xs font-medium text-gray-600 uppercase">
												Address
											</p>
											<p className="font-semibold text-gray-900">
												{selectedApp.address}
											</p>
										</div>
									</div>
								</div>

								{/* Admin Notes */}
								<div className="border-t pt-4">
									<label className="block text-sm font-semibold text-gray-900 mb-3">
										Admin Notes
									</label>
									<textarea
										value={statusNotes}
										onChange={(e) => setStatusNotes(e.target.value)}
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
										rows={3}
										placeholder="Add notes about this application..."
									/>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3 pt-2">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											updateStatus(
												selectedApp.id,
												selectedApp.status,
												statusNotes
											);
											setShowModal(false);
										}}
										className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg font-medium transition-all"
									>
										Save Changes
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											if (confirm("Are you sure? This cannot be undone.")) {
												handleDelete(selectedApp.id);
											}
										}}
										className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg font-medium transition-all"
									>
										Delete Application
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setShowModal(false)}
										className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
									>
										Close
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
