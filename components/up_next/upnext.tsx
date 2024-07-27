import { Card } from "../ui/card";
import { TypographyH1 } from "../ui/typography";
import BackpropagationDemo from "@/content/backpropagation/components/BackPropDemo";

export default function UpNext() {
  return (
    <Card className="mt-10 mb-5 p-5 px-10 border-none">
      <TypographyH1>Sneak Peak Of What&apos;s Up Next?</TypographyH1>
      <div className='bg-gray-800 text-background rounded-lg'>
        <BackpropagationDemo />
      </div>
    </Card>
  );
}
