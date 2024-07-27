import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { TypographyH3, TypographySmall } from '@/components/ui/typography';
import { BlogMetadata } from './page';

export default function Blogs({ blogs } : { blogs: BlogMetadata[] }) {
  return (
    <>
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blogs/${blog.slug}`} className='mb-3'>
          <Card className='p-4 shadow-md border-border_color flex flex-col gap-2'>
            <TypographyH3>
                {blog.title}
            </TypographyH3>
            <div className='flex flex-row justify-between'>
              <TypographySmall>By: {blog.author}</TypographySmall>
              <TypographySmall>Date: {blog.date}</TypographySmall>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
}
