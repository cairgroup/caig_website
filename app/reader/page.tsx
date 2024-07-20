"use client";

import Navbar from '@/components/hero_page/navbar';
import { useEffect, useState } from 'react';
import { TypographyH1 } from '@/components/ui/typography';
import { getStaticPropsBlogs } from './fetch_blogs';
import Blogs from './blogs';

export interface BlogMetadata {
  slug: string,
  title: string,
  author: string,
  date: string,
}

function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogMetadata[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getBlogs() {
      const fetchBlogs = await getStaticPropsBlogs();
      if (fetchBlogs.status != 200) {
        setIsLoading(false);
        return;
      }

      setBlogs(fetchBlogs.output);
      setIsLoading(false);
    }

    void getBlogs();
  }, [])

  return (
    <div className="p-5 md:p-12 h-full">
      <Navbar className="animate-fade-up mb-8" />
      <div className='w-full flex flex-col'>
        {isLoading ? <TypographyH1 className='col-span-full'>Loading...</TypographyH1> :
          <>
            {blogs != null ?
              <Blogs blogs={blogs}/> :
              <TypographyH1 className='col-span-full'>Failed To Load, Try Refreshing The Page</TypographyH1>
            }
          </>
        }
      </div>
    </div>
  );
}

export default BlogsPage;
