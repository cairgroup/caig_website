import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { BlogMetadata } from '@/app/blogs/page';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const main_directory = fs.readdirSync(path.join(
      process.cwd(), `${process.env.BLOG_FILE_PATH}`
    ));

    const blogs: BlogMetadata[] = main_directory.map((dir_name) => {
      const markdown = fs.readFileSync(
        path.join(process.cwd(), 'content', dir_name, dir_name + '.md'),
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

    return NextResponse.json({
      status: 200,
      statusMessage: "success",
      output: blogs.filter((blog_metadata) => {
        return blog_metadata['published'];
      }),
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 404,
      statusMessage: error.message,
      output: null,
    });
  }
}
