"use server";

import * as fs from 'fs';
import { ReturnStatus } from '@/lib/server-action';
import { BlogMetadata } from './page';

export async function getStaticPropsBlogs(): Promise<ReturnStatus> {
  try {
    const blogsMetadata = fs.readFileSync('app/blogs/content/metadata.json', 'utf-8');
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
