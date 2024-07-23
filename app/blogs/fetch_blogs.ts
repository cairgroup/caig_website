"use server";

import * as fs from 'fs';
import path from 'path';
import { ReturnStatus } from '@/lib/server-action';
import { BlogMetadata } from './page';

export async function getStaticPropsBlogs(): Promise<ReturnStatus> {
  try {
    const filePath = path.join('public', 'content', 'metadata.json');
    // const fileContents = fs.readFileSync(filePath, 'utf8');
    // const metadata = JSON.parse(fileContents);
    const blogsMetadata = fs.readFileSync('public/content/metadata.json', 'utf-8');
    const blogPosts: BlogMetadata[] = JSON.parse(blogsMetadata)

    return {
      status: 200,
      statusMessage: "success",
      output: blogPosts,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 404,
      statusMessage: "error",
      output: null,
    };
  }
}
