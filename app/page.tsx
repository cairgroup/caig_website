import UpcomingEvents from "@/components/calendar/upcoming_events";
import HeroSection from "@/components/hero_page/hero_section";
import Navbar from "@/components/hero_page/navbar";

export default function Home() {
  return (
    <div className="p-5 md:p-12">
      <Navbar className="animate-fade-up mb-8" />
      <HeroSection />
      <UpcomingEvents />
    </div>
  );
}
