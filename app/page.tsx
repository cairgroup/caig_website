import UpcomingEvents from "@/components/calendar/upcoming_events";
import HeroSection from "@/components/hero_page/hero_section";
import Navbar from "@/components/hero_page/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-start justify-center p-5 m:p-12 overflow-hidden bg-background text-black">
      <div className="min-h-screen w-[300px] sm:w-[600px] md:w-[700px] lg:w-[900px] self-center">
        <Navbar className="animate-fade-up mb-8" />
        <HeroSection />
        <UpcomingEvents />
      </div>
    </main>
  );
}
