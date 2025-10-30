/** @format */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: process.env.AUTH_SECRET, // ← ADD THIS LINE
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const admin = await prisma.admin.findUnique({
					where: { email: credentials.email as string },
				});

				if (!admin) {
					return null;
				}

				const isPasswordValid = await bcrypt.compare(
					credentials.password as string,
					admin.password
				);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: admin.id.toString(),
					email: admin.email,
					name: admin.name,
				};
			},
		}),
	],
	pages: {
		signIn: "/admin",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/admin/dashboard");

			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false;
			}

			return true;
		},
	},
});
