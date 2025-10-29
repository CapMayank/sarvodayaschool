/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "img.icons8.com",
			},
		],
	},
};
export default nextConfig;
