/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
	try {
		const { email, password, name } = await request.json();

		// Check if admin already exists
		const existingAdmin = await prisma.admin.findUnique({
			where: { email },
		});

		if (existingAdmin) {
			return NextResponse.json(
				{ error: "Admin already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create admin
		const admin = await prisma.admin.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		return NextResponse.json(
			{ message: "Admin created successfully", adminId: admin.id },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating admin:", error);
		return NextResponse.json(
			{ error: "Failed to create admin" },
			{ status: 500 }
		);
	}
}
