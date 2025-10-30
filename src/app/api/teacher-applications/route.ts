/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const applications = await prisma.teacherApplication.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(applications);
	} catch (error) {
		console.error("Error fetching teacher applications:", error);
		return NextResponse.json(
			{ error: "Failed to fetch teacher applications" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const application = await prisma.teacherApplication.create({
			data: {
				name: body.name,
				gender: body.gender,
				mobileNumber: body.mobileNumber,
				address: body.address,
				district: body.district,
				block: body.block,
				qualifications: body.qualifications,
				specialization: body.specialization,
				professionalQualification: body.professionalQualification,
				otherProfessionalQualification:
					body.otherProfessionalQualification || "",
				subject: body.subject,
				class: body.class,
				experience: parseInt(body.experience),
				status: "New",
			},
		});

		return NextResponse.json(application, { status: 201 });
	} catch (error) {
		console.error("Error creating teacher application:", error);
		return NextResponse.json(
			{ error: "Failed to submit teacher application" },
			{ status: 500 }
		);
	}
}
