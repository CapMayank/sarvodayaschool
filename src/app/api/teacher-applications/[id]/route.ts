/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		const application = await prisma.teacherApplication.findUnique({
			where: { id: parseInt(id) },
		});

		if (!application) {
			return NextResponse.json(
				{ error: "Teacher application not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(application);
	} catch (error) {
		console.error("Error fetching teacher application:", error);
		return NextResponse.json(
			{ error: "Failed to fetch teacher application" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const body = await request.json();

		const application = await prisma.teacherApplication.update({
			where: { id: parseInt(id) },
			data: {
				status: body.status,
				notes: body.notes,
			},
		});

		return NextResponse.json(application);
	} catch (error) {
		console.error("Error updating teacher application:", error);
		return NextResponse.json(
			{ error: "Failed to update teacher application" },
			{ status: 500 }
		);
	}
}
