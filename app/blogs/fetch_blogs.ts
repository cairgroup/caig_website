"use server";

import * as fs from 'fs';
import path from 'path';
import { getBaseUrl } from '@/lib/environment';
import { ReturnStatus } from '@/lib/server-action';
import { BlogMetadata } from './page';

const fetchBlogMetadata = async (dir_name: string) => {
  const base_url = getBaseUrl();
  const request = await fetch(`${base_url}/${process.env.BLOG_FILE_PATH}/${dir_name}/${dir_name}.md`);

  if (!request.ok) {
    throw new Error(`Failed to fetch /${process.env.BLOG_FILE_PATH}/${dir_name}/${dir_name}.md: ${request.statusText}`);
  }

  const markdown = await request.text();

  const header_lines = markdown.split('---')[1].split('\n');
  const blog_metadata: { [key: string]: any } = {};
  for (const header_line of header_lines) {
    const [json_title, json_info] = header_line.split(': ');
    blog_metadata[json_title] = json_info;
  }

  blog_metadata['slug'] = dir_name;
  blog_metadata['published'] = blog_metadata['published'] === 'true';

  return blog_metadata as BlogMetadata;
}

export async function getStaticProps(): Promise<ReturnStatus> {
  try {
    const main_directory = fs.readdirSync(path.resolve(
      process.cwd(), `public/${process.env.BLOG_FILE_PATH}`
    ));
    const blogs: BlogMetadata[] = [];

    for (const dir of main_directory) {
      blogs.push(await fetchBlogMetadata(dir));
    }

    return {
      status: 200,
      statusMessage: 'success',
      output: blogs.filter((blog_metadata) => {
        return blog_metadata['published'];
      }),
    }
  } catch (error: any) {
    return {
      status: 404,
      statusMessage: 'error',
      output: null,
      message: error.message,
    }
  }
}
