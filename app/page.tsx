import UpcomingEvents from "@/components/calendar/upcoming_events";
import FoundersNote from "@/components/founders_note/founders_note";
import HeroSection from "@/components/hero_page/hero_section";
import Navbar from "@/components/hero_page/navbar";
import UpNext from "@/components/up_next/upnext";

export default function Home() {
  return (
    <div className="p-5 md:p-12 flex flex-col">
      <Navbar className="animate-fade-up mb-8" />
      <HeroSection />
      <UpcomingEvents />
      <UpNext />
      <FoundersNote />
    </div>
  );
}
