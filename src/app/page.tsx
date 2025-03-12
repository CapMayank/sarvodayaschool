/** @format */

import Hero from "@/components/hero/hero";
import Banner from "@/components/banner/banner";
import Slideshow from "@/components/slideshow/slideshow";
import News from "@/components/news/news";
import Footer from "@/components/footer/footer";

export default function Home() {
	return (
		<>
			<Hero />
			<Banner />
			<Slideshow />
			<News />
			<Footer />
		</>
	);
}
