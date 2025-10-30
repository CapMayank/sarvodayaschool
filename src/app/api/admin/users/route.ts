/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET all admin users
export async function GET() {
	try {
		const admins = await prisma.admin.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(admins);
	} catch (error) {
		console.error("Error fetching admins:", error);
		return NextResponse.json(
			{ error: "Failed to fetch admin users" },
			{ status: 500 }
		);
	}
}

// POST create new admin user
export async function POST(request: NextRequest) {
	try {
		const { email, password, name } = await request.json();

		// Validation
		if (!email || !password || !name) {
			return NextResponse.json(
				{ error: "Email, password, and name are required" },
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ error: "Password must be at least 6 characters" },
				{ status: 400 }
			);
		}

		// Check if email already exists
		const existingAdmin = await prisma.admin.findUnique({
			where: { email },
		});

		if (existingAdmin) {
			return NextResponse.json(
				{ error: "Email already exists" },
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
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return NextResponse.json(admin, { status: 201 });
	} catch (error) {
		console.error("Error creating admin:", error);
		return NextResponse.json(
			{ error: "Failed to create admin user" },
			{ status: 500 }
		);
	}
}
