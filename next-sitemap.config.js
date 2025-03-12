/** @format */

module.exports = {
	siteUrl: "https://www.sarvodayaschool.co.in", // Your website domain
	generateRobotsTxt: true, // Enable robots.txt
	sitemapSize: 5000, // Set limit per sitemap file
	robotsTxtOptions: {
		policies: [
			{ userAgent: "*", allow: "/" }, // Allow all pages to be indexed
		],
	},
};
