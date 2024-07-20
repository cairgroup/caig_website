import { Card } from "../ui/card";
import { TypographyH1, TypographyP } from "../ui/typography";

export default function FoundersNote() {
  return (
    <Card className="mt-10 mb-5 p-5 px-10 bg-background_2">
      <TypographyH1>
        Our Letter To You
      </TypographyH1>
      <div className="bold text-xl">
        <TypographyP>Hey everyone—</TypographyP>
        <TypographyP>AI learning can be daunting, but it doesn&apos;t have to be. Imagine exploring the vast world of artificial intelligence with a supportive community by your side.</TypographyP>
        <TypographyP>Many of us have experienced the frustration of trying to keep up with the rapid advancements in AI. Endless articles, complex research papers, and a feeling of being overwhelmed. It&apos;s easy to get lost.</TypographyP>
        <TypographyP>But here&apos;s the good news.</TypographyP>
        <TypographyP>AI is one of the most transformative fields of our time. It&apos;s not just for scientists or tech experts - it&apos;s for anyone willing to learn. And that&apos;s where the Cambridge AI Group (CAIG) comes in.</TypographyP>
        <TypographyP>In our group, we simplify the complex. We break down the latest AI trends, research, and applications into digestible discussions. Whether you&apos;re a beginner or an expert, you&apos;ll find value in our sessions. We believe in the power of collective learning - when we share knowledge, we all grow.</TypographyP>
        <TypographyP>Our group is more than just a study circle. It&apos;s a community. A place where you can ask questions without judgment, share insights, and connect with like-minded individuals from diverse backgrounds. Together, we can navigate the ever-evolving landscape of AI.</TypographyP>
        <TypographyP>Join CAIG today. Let&apos;s unlock the potential of artificial intelligence, together.</TypographyP>
        <TypographyP className="flex flex-col">
          <span>Best regards,</span>
          <span>Eli Olcott, Davin Jeong, and Emmanuel Rassou</span>
          <span>Directors of CAIG</span>
        </TypographyP>
      </div>
    </Card>
  );
}
