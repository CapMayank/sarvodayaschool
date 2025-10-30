/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Header from "@/components/header/header";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		if (!email || !password) {
			setError("Email and password are required");
			setIsLoading(false);
			return;
		}

		if (!email.includes("@")) {
			setError("Please enter a valid email address");
			setIsLoading(false);
			return;
		}

		try {
			const result = await signIn("credentials", {
				email: email.toLowerCase().trim(),
				password,
				redirect: false,
			});

			if (!result) {
				setError("An unexpected error occurred. Please try again.");
				return;
			}

			if (result.error) {
				setError("Invalid email or password");
				return;
			}

			if (result.ok) {
				router.push("/admin/dashboard");
				router.refresh();
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("Login failed. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Header title="Admin" />
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100">
				<div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
					<h1 className="text-3xl font-bold mb-6 text-center text-red-600">
						Admin Login
					</h1>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
							{error}
						</div>
					)}

					<form onSubmit={handleLogin} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
								placeholder="admin@example.com"
								required
								disabled={isLoading}
								autoComplete="email"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
								placeholder="Enter your password"
								required
								disabled={isLoading}
								autoComplete="current-password"
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Logging in..." : "Login"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
