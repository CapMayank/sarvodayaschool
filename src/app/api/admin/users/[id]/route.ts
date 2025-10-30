/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET single admin user
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		const admin = await prisma.admin.findUnique({
			where: { id: parseInt(id) },
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!admin) {
			return NextResponse.json({ error: "Admin not found" }, { status: 404 });
		}

		return NextResponse.json(admin);
	} catch (error) {
		console.error("Error fetching admin:", error);
		return NextResponse.json(
			{ error: "Failed to fetch admin user" },
			{ status: 500 }
		);
	}
}

// PUT update admin user
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { email, name, password } = await request.json();

		const updateData: any = {};

		if (email) updateData.email = email;
		if (name) updateData.name = name;

		// Only hash and update password if provided
		if (password) {
			if (password.length < 6) {
				return NextResponse.json(
					{ error: "Password must be at least 6 characters" },
					{ status: 400 }
				);
			}
			updateData.password = await bcrypt.hash(password, 10);
		}

		const admin = await prisma.admin.update({
			where: { id: parseInt(id) },
			data: updateData,
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return NextResponse.json(admin);
	} catch (error) {
		console.error("Error updating admin:", error);
		return NextResponse.json(
			{ error: "Failed to update admin user" },
			{ status: 500 }
		);
	}
}

// DELETE admin user
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		// Prevent deleting the last admin
		const adminCount = await prisma.admin.count();
		if (adminCount <= 1) {
			return NextResponse.json(
				{ error: "Cannot delete the last admin user" },
				{ status: 400 }
			);
		}

		await prisma.admin.delete({
			where: { id: parseInt(id) },
		});

		return NextResponse.json({ message: "Admin user deleted" });
	} catch (error) {
		console.error("Error deleting admin:", error);
		return NextResponse.json(
			{ error: "Failed to delete admin user" },
			{ status: 500 }
		);
	}
}
