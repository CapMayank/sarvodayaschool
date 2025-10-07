/** @format */

"use client";

export default function News() {
	return (
		<section className="relative w-full bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 overflow-hidden">
			{/* Decorative Background Elements */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl -z-10"></div>
			<div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl -z-10"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header - Compact Version */}
				<div className="text-center mb-8 md:mb-10">
					{/* Main Heading */}
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
						Latest Updates
					</h2>

					{/* Subtitle */}
					<p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
						Stay connected with the latest news and announcements from{" "}
						<span className="font-semibold text-gray-800">
							Sarvodaya English Higher Secondary School
						</span>
					</p>
				</div>

				{/* Feed Container */}
				<div className="relative bg-white rounded-3xl shadow-2xl p-0 border border-gray-100 hover:shadow-3xl transition-all duration-500 group overflow-hidden">
					{/* Corner Accent */}
					<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-bl-full rounded-tr-3xl"></div>
					<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-500/10 to-pink-500/10 rounded-tr-full rounded-bl-3xl"></div>

					{/* Top Border Accent */}
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 rounded-full"></div>

					{/* Facebook Feed iframe */}
					<div className="relative z-10">
						<iframe
							src="https://widgets.sociablekit.com/facebook-page-posts/iframe/25607304"
							className="w-full min-h-[1000px] border-0 block rounded-3xl"
							title="Facebook Posts"
							loading="lazy"
							style={{ margin: 0, padding: 0, display: "block" }}
						/>
					</div>
				</div>

				{/* Bottom Decorative Text */}
				<div className="text-center mt-6">
					<p className="text-sm text-gray-500 font-medium">
						Follow us for daily updates and school announcements
					</p>
				</div>
			</div>
		</section>
	);
}
