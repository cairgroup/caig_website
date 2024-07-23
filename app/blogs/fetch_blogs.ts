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
    const file2 = path.resolve(__dirname, '../../public/content/metadata.json');
    const file = path.join(process.cwd(), '/public/content/metadata.json');
    console.log(file);
    console.log(file2);
    const blogsMetadata = fs.readFileSync(file, 'utf-8');
    const blogsMetadata2 = fs.readFileSync(file2, 'utf-8');
    console.log(blogsMetadata);
    console.log(blogsMetadata2);
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
