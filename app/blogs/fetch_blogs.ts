"use server";

import * as fs from 'fs';
import path from 'path';
import { ReturnStatus } from '@/lib/server-action';
import { BlogMetadata } from './page';

export async function getStaticProps(): Promise<ReturnStatus> {
  try {
    const main_directory = fs.readdirSync(path.join('content'));

    const blogs: BlogMetadata[] = main_directory.map((dir_name) => {
      const markdown = fs.readFileSync(
        path.join('content', dir_name, dir_name + '.md'),
        'utf-8'
      );

      const header_lines = markdown.split('---')[1].split('\n');
      const blog_metadata: { [key: string]: any } = {};
      for (const header_line of header_lines) {
        const [json_title, json_info] = header_line.split(': ');
        blog_metadata[json_title] = json_info;
      }

      blog_metadata['slug'] = dir_name;
      blog_metadata['published'] = blog_metadata['published'] === 'true';

      return blog_metadata as BlogMetadata;
    }).filter((blog_metadata) => {
      return blog_metadata['published'];
    });

    return {
      status: 200,
      statusMessage: 'success',
      output: blogs,
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
