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
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 px-4">
				<div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-red-50">
					<h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
						Admin Login
					</h1>

					{error && (
						<div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-xl mb-6 shadow-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleLogin} className="space-y-6">
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2.5">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300 text-gray-900 placeholder-gray-400"
								placeholder="admin@example.com"
								required
								disabled={isLoading}
								autoComplete="email"
							/>
						</div>

						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2.5">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300 text-gray-900 placeholder-gray-400"
								placeholder="Enter your password"
								required
								disabled={isLoading}
								autoComplete="current-password"
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-xl font-semibold text-base hover:from-red-700 hover:to-rose-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg mt-2"
						>
							{isLoading ? "Logging in..." : "Login"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
