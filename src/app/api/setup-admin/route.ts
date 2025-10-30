/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
	try {
		// Check if any admin exists
		const adminCount = await prisma.admin.count();

		if (adminCount > 0) {
			return NextResponse.json({ message: "Admin already exists" });
		}

		// Create first admin
		const hashedPassword = await bcrypt.hash("admin123", 10);

		await prisma.admin.create({
			data: {
				email: "admin@sarvodaya.com",
				password: hashedPassword,
				name: "Admin",
			},
		});

		return NextResponse.json({
			message: "First admin created",
			email: "admin@sarvodaya.com",
			password: "admin123",
		});
	} catch (error) {
		return NextResponse.json({ error: "Setup failed" }, { status: 500 });
	}
}
