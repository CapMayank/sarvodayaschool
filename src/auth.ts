/** @format */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60,
	},
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password are required");
				}

				try {
					const admin = await prisma.admin.findUnique({
						where: { email: (credentials.email as string).toLowerCase() },
					});

					if (!admin) {
						throw new Error("CredentialsSignin");
					}

					const isPasswordValid = await bcrypt.compare(
						credentials.password as string,
						admin.password
					);

					if (!isPasswordValid) {
						throw new Error("CredentialsSignin");
					}

					return {
						id: admin.id.toString(),
						email: admin.email,
						name: admin.name,
					};
				} catch (error) {
					throw new Error("CredentialsSignin");
				}
			},
		}),
	],
	pages: {
		signIn: "/admin",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
			}
			return session;
		},
	},
});
