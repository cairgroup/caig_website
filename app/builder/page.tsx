import Navbar from "@/components/hero_page/navbar";
import { Icons } from "@/components/icons";
import { TypographyH1 } from "@/components/ui/typography";

const BackgroundRotatingGears = () =>  {
  const numGears = 15
  const options: [number, number, boolean][] = [
    // [ x, y, selected ]
    [84, 59, false],
    [24, 82, false],
    [41, 21, false],
    [28, 23, false],
    [4, 85, false],
    [30, 35, false],
    [18, 32, false],
    [80, 85, false],
    [59, 48, false],
    [16, 13, false],
    [3, 15, false],
    [46, 67, false],
    [24, 45, false],
    [80, 33, false],
    [58, 66, false],
    [87, 69, false],
    [88, 10, false],
    [65, 14, false],
    [52, 10, false],
    [54, 86, false]
  ]
  const positions: [number, number][] = []

  for (let i = 0; i < numGears; i++) {
    let choice = Math.floor(Math.random() * options.length);
    if (choice === options.length) {
      choice -= 1;
    }

    while (options[choice][2] != false) {
      choice = Math.floor(Math.random() * options.length);
      if (choice === options.length) {
        choice -= 1;
      }
    }

    options[choice][2] = true;

    positions.push([options[choice][0], options[choice][1]])
  }

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {[...Array(numGears)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-64 h-64 opacity-10 animate-spin`}
          style={{
            top: `${positions[i][1]}%`,
            left: `${positions[i][0]}%`,
            animationDuration: `${20 + i * 5}s`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 15c-19.33 0-35 15.67-35 35s15.67 35 35 35 35-15.67 35-35-15.67-35-35-35zm0 60c-13.79 0-25-11.21-25-25s11.21-25 25-25 25 11.21 25 25-11.21 25-25 25z"
              fill="currentColor"
            />
            {[...Array(8)].map((_, j) => (
              <rect
                key={j}
                x="48"
                y="5"
                width="4"
                height="20"
                fill="currentColor"
                transform={`rotate(${j * 45} 50 50)`}
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  )
};

export default function BuilderPage() {
  return (
    <div className="p-5 md:p-12 flex flex-col h-full w-full">
      <Navbar className="animate-fade-up mb-8 z-10" />
      <BackgroundRotatingGears />
      <div className="w-full h-full flex flex-row justify-center">
        <div className="relative w-12 h-12 flex-shrink-0 pb-6 mr-6">
          <Icons.hammer className="absolute top-0 left-3 w-14 h-14 text-primary" />
          <Icons.wrench className="absolute top-0 -left-1 w-14 h-14 text-primary -rotate-90" />
        </div>
        <TypographyH1 className="p-2 text-black">Builder&apos;s Page Is Currently Being Built</TypographyH1>
        <div className="relative w-12 h-12 flex-shrink-0 pb-6 ml-2">
          <Icons.hammer className="absolute top-0 left-3 w-14 h-14 text-primary" />
          <Icons.wrench className="absolute top-0 -left-1 w-14 h-14 text-primary -rotate-90" />
        </div>
      </div>
    </div>
  );
}
