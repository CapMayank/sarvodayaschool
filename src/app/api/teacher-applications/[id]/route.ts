/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		// Delete the teacher application
		await prisma.teacherApplication.delete({
			where: { id },
		});

		return NextResponse.json(
			{ message: "Application deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting teacher application:", error);
		return NextResponse.json(
			{ error: "Failed to delete application" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id);
		const body = await request.json();

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		const application = await prisma.teacherApplication.update({
			where: { id },
			data: {
				status: body.status,
				notes: body.notes,
			},
		});

		return NextResponse.json(application);
	} catch (error) {
		console.error("Error updating teacher application:", error);
		return NextResponse.json(
			{ error: "Failed to update application" },
			{ status: 500 }
		);
	}
}
