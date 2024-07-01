import Image from "next/image";

export function HeroSectionImages() {
  return (
    <Image src="/hero_photos/main_1.jpg" alt="Hero Image" width={300} height={100} className="animate-fade-up md:w-[350px] lg:w-auto rounded-md shadow-md" />
  );
}
