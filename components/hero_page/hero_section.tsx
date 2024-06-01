import Link from "next/link";
import { TypographyH1, TypographyH3 } from "../ui/typography";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row-reverse justify-center align-middle gap-4 max-w-[900px]">
      <Image src="/main.png" alt="Hero Image" width={900} height={600} className="animate-fade-up md:w-[350px] lg:w-auto rounded-md shadow-md" />

      <div className="flex flex-col justify-center align-middle">
        <div className="animate-fade-up flex flex-col items-start justify-start">
          <div className="w-full flex justify-start">
            <TypographyH1 className="lg:text-6xl md:text-6xl text-primary text-center">Cambridge AI Group</TypographyH1>
          </div>
          <TypographyH3 className='lg:text-3xl md:text-3xl mb-3 text-primary text-center sm:text-left w-full align-middle'>
            Advancing AI Innovation Through Collaborative Learning
          </TypographyH3>
        </div>

        <div className="animate-fade-up flex flex-col items-center md:items-start justify-center w-full">
          <Link target="_blank" href="/#" className="m-3">
            <Button
              variant="default"
              size="lg"
              className="w-[250px] sm:w-[350px] text-xl h-auto p-2 border-primary border-2 bg-background hover:bg-primary hover:text-background group flex items-center duration-200 ease-in-out"
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
              className="w-[250px] sm:w-[350px] text-xl h-auto p-2 border-highlight border-2 bg-background hover:bg-highlight hover:text-background group flex items-center duration-200 ease-in-out"
            >
              <div className="relative flex-shrink-0 pb-6">
                <Icons.pencilRuler className="absolute top-0 left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icons.pencil className="absolute top-0 left-0 visible opacity-100 group-hover:opacity-0 group-hover:invisible transition-opacity duration-300" />
              </div>

              <span className="ml-8">Builder Sign Up</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
