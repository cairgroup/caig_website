import UpcomingEvents from "@/components/calendar/upcoming_events";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-start justify-center p-5 m:p-12 overflow-hidden bg-background text-black">
      <div className="w-[300px] sm:w-[600px] md:w-[700px] lg:w-[900px] self-center">
        <div className="animate-fade-up flex flex-col items-start justify-start sm:pt-2 md:pt-24 max-w-[600px]">
          <div className="flex flex-row w-full justify-center sm:justify-start align-middle">
            <Image src="/logo.png" alt="CAIRG" height={75} width={75} className="mb-2" />
          </div>
          <div className="w-full flex justify-start">
            <TypographyH1 className="lg:text-6xl md:text-6xl text-primary text-center">Cambridge AI Group</TypographyH1>
          </div>
          <TypographyH3 className='lg:text-3xl md:text-3xl mb-3 text-primary text-center sm:text-left w-full align-middle'>
            Advancing AI Innovation Through Collaborative Learning
          </TypographyH3>
        </div>

        <div className="animate-fade-up flex flex-col md:flex-row items-center md:items-start justify-center w-full">
          <Link target="_blank" href="/#" className="m-3">
            <Button
              variant="default"
              size="lg"
              className="w-[250px] sm:w-[350px] text-xl h-auto p-2 border-primary border-2 bg-background hover:bg-primary hover:text-background group flex items-center"
            >
              <div className="relative flex-shrink-0 pb-6">
                <Icons.bookOpen className="absolute top-0 left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icons.book className="absolute top-0 left-0 visible opacity-100 group-hover:opacity-0 group-hover:invisible transition-opacity duration-300" />
              </div>

              <span className="ml-8">Reader Sign Up</span>
            </Button>
          </Link>

          <Link target="_blank" href="/#" className="m-3">
            <Button
              variant="default"
              size="lg"
              className="w-[250px] sm:w-[350px] text-xl h-auto p-2 border-highlight border-2 bg-background hover:bg-highlight hover:text-background group flex items-center"
            >
              <div className="relative flex-shrink-0 pb-6">
                <Icons.pencilRuler className="absolute top-0 left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icons.pencil className="absolute top-0 left-0 visible opacity-100 group-hover:opacity-0 group-hover:invisible transition-opacity duration-300" />
              </div>

              <span className="ml-8">Builder Sign Up</span>
            </Button>
          </Link>
        </div>

        <UpcomingEvents />
      </div>
    </main>
  );
}
