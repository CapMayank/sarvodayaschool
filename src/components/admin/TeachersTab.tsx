/** @format */

"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function TeachersTab() {
	const [applications, setApplications] = useState<any[]>([]);
	const [selectedApp, setSelectedApp] = useState<any>(null);
	const [showModal, setShowModal] = useState(false);

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
			loadApplications();
		} catch (error) {
			console.error("Error updating application:", error);
			alert("Failed to update status");
		}
	};

	const viewDetails = (app: any) => {
		setSelectedApp(app);
		setShowModal(true);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Teacher Applications</h2>
				<div className="text-sm text-gray-600">
					Total Applications:{" "}
					<span className="font-bold">{applications.length}</span>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Subject
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Class
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Experience
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Mobile
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
						{applications.map((app) => (
							<tr key={app.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="font-medium text-gray-900">{app.name}</div>
									<div className="text-sm text-gray-500">{app.gender}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">{app.subject}</td>
								<td className="px-6 py-4 whitespace-nowrap">{app.class}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{app.experience} years
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{app.mobileNumber}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<select
										value={app.status}
										onChange={(e) =>
											updateStatus(app.id, e.target.value, app.notes || "")
										}
										className="text-sm border rounded px-2 py-1"
									>
										<option value="New">New</option>
										<option value="Shortlisted">Shortlisted</option>
										<option value="Interview Scheduled">
											Interview Scheduled
										</option>
										<option value="Hired">Hired</option>
										<option value="Rejected">Rejected</option>
									</select>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm">
									{new Date(app.createdAt).toLocaleDateString()}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm">
									<button
										onClick={() => viewDetails(app)}
										className="text-blue-600 hover:text-blue-900 font-medium"
									>
										View Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{applications.length === 0 && (
					<div className="text-center py-12 text-gray-500">
						<p className="text-lg font-medium">No teacher applications yet</p>
						<p className="mt-1">
							Applications will appear here when submitted.
						</p>
					</div>
				)}
			</div>

			{/* Modal for viewing details */}
			{showModal && selectedApp && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-600">Name</p>
									<p className="font-medium">{selectedApp.name}</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Gender</p>
									<p className="font-medium">{selectedApp.gender}</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Mobile Number</p>
									<p className="font-medium">{selectedApp.mobileNumber}</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Experience</p>
									<p className="font-medium">{selectedApp.experience} years</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Subject</p>
									<p className="font-medium">{selectedApp.subject}</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Class</p>
									<p className="font-medium">{selectedApp.class}</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">District</p>
									<p className="font-medium">{selectedApp.district}</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Block</p>
									<p className="font-medium">{selectedApp.block}</p>
								</div>
								<div className="col-span-2">
									<p className="text-sm text-gray-600">Address</p>
									<p className="font-medium">{selectedApp.address}</p>
								</div>
								<div className="col-span-2">
									<p className="text-sm text-gray-600">Qualifications</p>
									<p className="font-medium">{selectedApp.qualifications}</p>
								</div>
								<div className="col-span-2">
									<p className="text-sm text-gray-600">Specialization</p>
									<p className="font-medium">{selectedApp.specialization}</p>
								</div>
								<div className="col-span-2">
									<p className="text-sm text-gray-600">
										Professional Qualification
									</p>
									<p className="font-medium">
										{selectedApp.professionalQualification}
									</p>
								</div>
								{selectedApp.otherProfessionalQualification && (
									<div className="col-span-2">
										<p className="text-sm text-gray-600">
											Other Professional Qualification
										</p>
										<p className="font-medium">
											{selectedApp.otherProfessionalQualification}
										</p>
									</div>
								)}
							</div>
							<div className="pt-4 border-t">
								<label className="block text-sm font-medium mb-2">
									Admin Notes
								</label>
								<textarea
									value={selectedApp.notes || ""}
									onChange={(e) =>
										setSelectedApp({ ...selectedApp, notes: e.target.value })
									}
									className="w-full p-2 border rounded"
									rows={3}
									placeholder="Add notes about this application..."
								/>
								<button
									onClick={() => {
										updateStatus(
											selectedApp.id,
											selectedApp.status,
											selectedApp.notes || ""
										);
										setShowModal(false);
									}}
									className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
								>
									Save Notes
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
