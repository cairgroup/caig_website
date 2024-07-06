import Link from "next/link";
import { TypographyH1, TypographyH3 } from "../ui/typography";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { HeroSectionImages } from "./images";

export default function HeroSection() {
  return (
    <div className="flex flex-col-reverse lg:flex-row-reverse justify-center items-center align-middle gap-4 max-w-[900px] pb-10 self-center">
      <HeroSectionImages />

      <div className="flex flex-col justify-center align-middle">
        <div className="animate-fade-up flex flex-col items-start justify-start">
          <div className="w-full flex justify-start">
            <TypographyH1 className="lg:text-6xl lg:pr-20 md:text-6xl text-left mb-6">
              <span className="before:block before:absolute before:-inset-2 before:-skew-y-2 before:bg-highlight relative inline-block p-3">
                <span className="relative text-white">The Cambridge AI Group</span>
              </span>
            </TypographyH1>
          </div>
          <TypographyH3 className='lg:text-3xl md:text-3xl mb-3 text-center sm:text-left w-full align-middle'>
            Advancing AI Innovation Through Collaborative Learning
          </TypographyH3>
        </div>

        <div className="animate-fade-up flex flex-col md:flex-row lg:flex-col items-center lg:items-start justify-center w-full">
          <Link target="_blank" href="/#" className="m-3">
            <Button
              variant="default"
              size="lg"
              className="w-[250px] sm:w-[350px] text-xl h-auto p-2 border-primary border-2 bg-background hover:bg-primary text-primary hover:text-background group flex items-center duration-200 ease-in-out"
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
              className="w-[250px] sm:w-[350px] text-xl h-auto p-2 border-highlight border-2 bg-background hover:bg-highlight text-highlight hover:text-background group flex items-center duration-200 ease-in-out"
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
