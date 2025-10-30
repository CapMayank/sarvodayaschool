/** @format */

// /** @format */

// "use client";

// import { useEffect, useState } from "react";
// import { apiClient } from "@/lib/api-client";

// export default function AdmissionsTab() {
// 	const [forms, setForms] = useState<any[]>([]);
// 	const [selectedForm, setSelectedForm] = useState<any>(null);
// 	const [showModal, setShowModal] = useState(false);

// 	useEffect(() => {
// 		loadForms();
// 	}, []);

// 	const loadForms = async () => {
// 		try {
// 			const data = await apiClient.getAdmissionForms();
// 			setForms(data);
// 		} catch (error) {
// 			console.error("Error loading forms:", error);
// 		}
// 	};

// 	const updateStatus = async (id: number, status: string, notes: string) => {
// 		try {
// 			await apiClient.updateAdmissionForm(id, { status, notes });
// 			loadForms();
// 		} catch (error) {
// 			console.error("Error updating form:", error);
// 			alert("Failed to update status");
// 		}
// 	};

// 	const viewDetails = (form: any) => {
// 		setSelectedForm(form);
// 		setShowModal(true);
// 	};

// 	return (
// 		<div>
// 			<div className="flex justify-between items-center mb-6">
// 				<h2 className="text-xl font-semibold">Admission Forms</h2>
// 				<div className="text-sm text-gray-600">
// 					Total Applications: <span className="font-bold">{forms.length}</span>
// 				</div>
// 			</div>

// 			<div className="bg-white rounded-lg shadow overflow-x-auto">
// 				<table className="min-w-full divide-y divide-gray-200">
// 					<thead className="bg-gray-50">
// 						<tr>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// 								Student Name
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// 								Class
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// 								Mobile
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// 								District
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// 								Status
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// 								Date
// 							</th>
// 							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
// 								Actions
// 							</th>
// 						</tr>
// 					</thead>
// 					<tbody className="bg-white divide-y divide-gray-200">
// 						{forms.map((form) => (
// 							<tr key={form.id} className="hover:bg-gray-50">
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<div className="font-medium text-gray-900">
// 										{form.studentName}
// 									</div>
// 									<div className="text-sm text-gray-500">{form.gender}</div>
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap">{form.class}</td>
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<div>{form.mobileNumber}</div>
// 									{form.alternateMobile && (
// 										<div className="text-xs text-gray-500">
// 											{form.alternateMobile}
// 										</div>
// 									)}
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<div>{form.district}</div>
// 									<div className="text-xs text-gray-500">{form.block}</div>
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<select
// 										value={form.status}
// 										onChange={(e) =>
// 											updateStatus(form.id, e.target.value, form.notes || "")
// 										}
// 										className="text-sm border rounded px-2 py-1"
// 									>
// 										<option value="New">New</option>
// 										<option value="Reviewed">Reviewed</option>
// 										<option value="Contacted">Contacted</option>
// 										<option value="Admitted">Admitted</option>
// 										<option value="Rejected">Rejected</option>
// 									</select>
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap text-sm">
// 									{new Date(form.createdAt).toLocaleDateString()}
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap text-right text-sm">
// 									<button
// 										onClick={() => viewDetails(form)}
// 										className="text-blue-600 hover:text-blue-900 font-medium"
// 									>
// 										View Details
// 									</button>
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>

// 				{forms.length === 0 && (
// 					<div className="text-center py-12 text-gray-500">
// 						<p className="text-lg font-medium">No admission forms yet</p>
// 						<p className="mt-1">Forms will appear here when submitted.</p>
// 					</div>
// 				)}
// 			</div>

// 			{/* Modal for viewing details */}
// 			{showModal && selectedForm && (
// 				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// 					<div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
// 						<div className="flex justify-between items-center mb-4">
// 							<h3 className="text-xl font-bold">Application Details</h3>
// 							<button
// 								onClick={() => setShowModal(false)}
// 								className="text-gray-500 hover:text-gray-700"
// 							>
// 								<svg
// 									className="w-6 h-6"
// 									fill="none"
// 									stroke="currentColor"
// 									viewBox="0 0 24 24"
// 								>
// 									<path
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										strokeWidth={2}
// 										d="M6 18L18 6M6 6l12 12"
// 									/>
// 								</svg>
// 							</button>
// 						</div>
// 						<div className="space-y-3">
// 							<div className="grid grid-cols-2 gap-4">
// 								<div>
// 									<p className="text-sm text-gray-600">Student Name</p>
// 									<p className="font-medium">{selectedForm.studentName}</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Gender</p>
// 									<p className="font-medium">{selectedForm.gender}</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Date of Birth</p>
// 									<p className="font-medium">
// 										{new Date(selectedForm.dateOfBirth).toLocaleDateString()}
// 									</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Class</p>
// 									<p className="font-medium">{selectedForm.class}</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Father's Name</p>
// 									<p className="font-medium">{selectedForm.fatherName}</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Mother's Name</p>
// 									<p className="font-medium">{selectedForm.motherName}</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Mobile Number</p>
// 									<p className="font-medium">{selectedForm.mobileNumber}</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Alternate Mobile</p>
// 									<p className="font-medium">
// 										{selectedForm.alternateMobile || "—"}
// 									</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">District</p>
// 									<p className="font-medium">{selectedForm.district}</p>
// 								</div>
// 								<div>
// 									<p className="text-sm text-gray-600">Block</p>
// 									<p className="font-medium">{selectedForm.block}</p>
// 								</div>
// 								<div className="col-span-2">
// 									<p className="text-sm text-gray-600">Address</p>
// 									<p className="font-medium">{selectedForm.address}</p>
// 								</div>
// 								<div className="col-span-2">
// 									<p className="text-sm text-gray-600">Previous School</p>
// 									<p className="font-medium">
// 										{selectedForm.previousSchool || "—"}
// 									</p>
// 								</div>
// 							</div>
// 							<div className="pt-4 border-t">
// 								<label className="block text-sm font-medium mb-2">
// 									Admin Notes
// 								</label>
// 								<textarea
// 									value={selectedForm.notes || ""}
// 									onChange={(e) =>
// 										setSelectedForm({ ...selectedForm, notes: e.target.value })
// 									}
// 									className="w-full p-2 border rounded"
// 									rows={3}
// 									placeholder="Add notes about this application..."
// 								/>
// 								<button
// 									onClick={() => {
// 										updateStatus(
// 											selectedForm.id,
// 											selectedForm.status,
// 											selectedForm.notes || ""
// 										);
// 										setShowModal(false);
// 									}}
// 									className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// 								>
// 									Save Notes
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function AdmissionsTab() {
	const [forms, setForms] = useState<any[]>([]);
	const [selectedForm, setSelectedForm] = useState<any>(null);
	const [showModal, setShowModal] = useState(false);
	const [filterStatus, setFilterStatus] = useState<string>("All");
	const [statusNotes, setStatusNotes] = useState<string>("");

	useEffect(() => {
		loadForms();
	}, []);

	const loadForms = async () => {
		try {
			const data = await apiClient.getAdmissionForms();
			setForms(data);
		} catch (error) {
			console.error("Error loading forms:", error);
		}
	};

	const updateStatus = async (id: number, status: string, notes: string) => {
		try {
			await apiClient.updateAdmissionForm(id, { status, notes });
			setStatusNotes("");
			loadForms();
		} catch (error) {
			console.error("Error updating form:", error);
			alert("Failed to update status");
		}
	};

	const handleDelete = async (id: number) => {
		if (
			!confirm(
				"Are you sure you want to delete this application? This action cannot be undone."
			)
		)
			return;

		try {
			await fetch(`/api/admission-forms/${id}`, {
				method: "DELETE",
			});
			setShowModal(false);
			loadForms();
			alert("Application deleted successfully");
		} catch (error) {
			console.error("Error deleting form:", error);
			alert("Failed to delete application");
		}
	};

	const viewDetails = (form: any) => {
		setSelectedForm(form);
		setStatusNotes(form.notes || "");
		setShowModal(true);
	};

	// Filter forms by status
	const filteredForms =
		filterStatus === "All"
			? forms
			: forms.filter((form) => form.status === filterStatus);

	// Status counts
	const statusCounts = {
		All: forms.length,
		New: forms.filter((f) => f.status === "New").length,
		Reviewed: forms.filter((f) => f.status === "Reviewed").length,
		Contacted: forms.filter((f) => f.status === "Contacted").length,
		Admitted: forms.filter((f) => f.status === "Admitted").length,
		Rejected: forms.filter((f) => f.status === "Rejected").length,
	};

	// Status badge colors
	const getStatusColor = (status: string) => {
		switch (status) {
			case "New":
				return "bg-blue-100 text-blue-800";
			case "Reviewed":
				return "bg-purple-100 text-purple-800";
			case "Contacted":
				return "bg-yellow-100 text-yellow-800";
			case "Admitted":
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
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-4">Admission Forms</h2>
				<div className="text-sm text-gray-600 mb-6">
					<span className="font-bold text-lg">{forms.length}</span> Total
					Applications
				</div>

				{/* Filter Pills */}
				<div className="flex flex-wrap gap-2">
					{["All", "New", "Reviewed", "Contacted", "Admitted", "Rejected"].map(
						(status) => (
							<button
								key={status}
								onClick={() => setFilterStatus(status)}
								className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
									filterStatus === status
										? "bg-red-600 text-white"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{status} ({statusCounts[status as keyof typeof statusCounts]})
							</button>
						)
					)}
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Student Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Class
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Mobile
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								District
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Date
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredForms.map((form) => (
							<tr key={form.id} className="hover:bg-gray-50 transition-colors">
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="font-medium text-gray-900">
										{form.studentName}
									</div>
									<div className="text-sm text-gray-500">{form.gender}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">{form.class}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div>{form.mobileNumber}</div>
									{form.alternateMobile && (
										<div className="text-xs text-gray-500">
											{form.alternateMobile}
										</div>
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div>{form.district}</div>
									<div className="text-xs text-gray-500">{form.block}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
											form.status
										)}`}
									>
										{form.status}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm">
									{new Date(form.createdAt).toLocaleDateString("en-IN", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
									<button
										onClick={() => viewDetails(form)}
										className="text-blue-600 hover:text-blue-900 font-medium"
									>
										View
									</button>
									<button
										onClick={() => {
											if (
												confirm(
													"Are you sure you want to delete this application?"
												)
											) {
												handleDelete(form.id);
											}
										}}
										className="text-red-600 hover:text-red-900 font-medium"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{filteredForms.length === 0 && (
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
								d="M9 12l2 2 4-4M7 20H5a2 2 0 01-2-2V5a2 2 0 012-2h6.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-3.586a1 1 0 00-.707.293l-5.414-5.414a1 1 0 00-.293-.707V5"
							/>
						</svg>
						<p className="text-lg font-medium">No applications found</p>
						<p className="mt-1">
							{filterStatus === "All"
								? "Forms will appear here when submitted."
								: `No ${filterStatus} applications yet.`}
						</p>
					</div>
				)}
			</div>

			{/* Modal for viewing details */}
			{showModal && selectedForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold">Application Details</h3>
							<button
								onClick={() => setShowModal(false)}
								className="text-gray-500 hover:text-gray-700"
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
							<div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
								<label className="block text-sm font-medium mb-3">Status</label>
								<select
									value={selectedForm.status}
									onChange={(e) =>
										setSelectedForm({ ...selectedForm, status: e.target.value })
									}
									className="w-full p-2 border rounded mb-3"
								>
									<option value="New">New</option>
									<option value="Reviewed">Reviewed</option>
									<option value="Contacted">Contacted</option>
									<option value="Admitted">Admitted</option>
									<option value="Rejected">Rejected</option>
								</select>
								<span
									className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
										selectedForm.status
									)}`}
								>
									{selectedForm.status}
								</span>
							</div>

							{/* Student Information */}
							<div>
								<h4 className="font-semibold text-gray-900 mb-4">
									Student Information
								</h4>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-sm text-gray-600">Student Name</p>
										<p className="font-medium">{selectedForm.studentName}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Gender</p>
										<p className="font-medium">{selectedForm.gender}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Date of Birth</p>
										<p className="font-medium">
											{new Date(selectedForm.dateOfBirth).toLocaleDateString(
												"en-IN"
											)}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Class</p>
										<p className="font-medium">{selectedForm.class}</p>
									</div>
								</div>
							</div>

							{/* Parent Information */}
							<div>
								<h4 className="font-semibold text-gray-900 mb-4">
									Parent Information
								</h4>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-sm text-gray-600">Father's Name</p>
										<p className="font-medium">{selectedForm.fatherName}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Mother's Name</p>
										<p className="font-medium">{selectedForm.motherName}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Mobile Number</p>
										<p className="font-medium">{selectedForm.mobileNumber}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Alternate Mobile</p>
										<p className="font-medium">
											{selectedForm.alternateMobile || "—"}
										</p>
									</div>
								</div>
							</div>

							{/* Location Information */}
							<div>
								<h4 className="font-semibold text-gray-900 mb-4">
									Location Information
								</h4>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-sm text-gray-600">District</p>
										<p className="font-medium">{selectedForm.district}</p>
									</div>
									<div>
										<p className="text-sm text-gray-600">Block</p>
										<p className="font-medium">{selectedForm.block}</p>
									</div>
								</div>
								<div className="mt-4">
									<p className="text-sm text-gray-600">Address</p>
									<p className="font-medium">{selectedForm.address}</p>
								</div>
							</div>

							{/* Previous School */}
							<div>
								<p className="text-sm text-gray-600">Previous School</p>
								<p className="font-medium">
									{selectedForm.previousSchool || "—"}
								</p>
							</div>

							{/* Admin Notes */}
							<div className="border-t pt-4">
								<label className="block text-sm font-medium mb-2">
									Admin Notes
								</label>
								<textarea
									value={statusNotes}
									onChange={(e) => setStatusNotes(e.target.value)}
									className="w-full p-2 border rounded"
									rows={3}
									placeholder="Add notes about this application..."
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-3">
								<button
									onClick={() => {
										updateStatus(
											selectedForm.id,
											selectedForm.status,
											statusNotes
										);
										setShowModal(false);
									}}
									className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
								>
									Save Changes
								</button>
								<button
									onClick={() => {
										if (
											confirm(
												"Are you sure you want to delete this application? This cannot be undone."
											)
										) {
											handleDelete(selectedForm.id);
										}
									}}
									className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
								>
									Delete Application
								</button>
								<button
									onClick={() => setShowModal(false)}
									className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
