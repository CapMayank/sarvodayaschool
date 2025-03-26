/** @format */

import Hero from "@/components/hero/hero";
import Banner from "@/components/banner/banner";
import Slideshow from "@/components/slideshow/slideshow";
import News from "@/components/news/news";
import Footer from "@/components/footer/footer";
import FacilitiesSection from "@/components/facilities/facilities";
import AchievementsSection from "@/components/achievements/achievements";

export default function Home() {
	return (
		<>
			<Hero />
			<Banner />
			<Slideshow />
			<FacilitiesSection />
			<AchievementsSection />
			<News />
			<Footer />
		</>
	);
}
