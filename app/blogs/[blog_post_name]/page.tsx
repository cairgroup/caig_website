"use client";

import BlogPostLayout from './blog_layout';
import Navbar from '@/components/hero_page/navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TypographyH1, TypographyH3 } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';

function BlogPost() {
  const [fileContent, setFileContent] = useState<string | null>('');
  const { blog_post_name } = useParams<{ blog_post_name: string }>();

  useEffect(() => {
    async function getContent() {
      const returnStatus: { status: number, statusMessage: string, output: string } = await fetch(
        `/api/fetch_internal_file?fileName=${blog_post_name}`,
        {
          method: 'GET',
        }
      ).then((response) => response.json());
      setFileContent(returnStatus.output);
    }

    void getContent();
  }, [blog_post_name])

  if (!fileContent) {
    const code = fileContent == null ? 404 : '';
    const message = fileContent == null ? "Requested blog post doesn't exist." : "Loading...";
    return (
      <div className="p-5 md:p-12 h-screen">
        <Navbar className="animate-fade-up mb-8" />
        <div className='w-full h-full text-center'>
          <Card className="mx-auto my-8 py-8 border-2 border-border_color">
            <TypographyH1>{code}</TypographyH1>
            <TypographyH3>{message}</TypographyH3>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-12">
      <Navbar className="animate-fade-up mb-8" />
      <BlogPostLayout content={fileContent} post_name={blog_post_name} />
    </div>
  );
}

export default BlogPost;

