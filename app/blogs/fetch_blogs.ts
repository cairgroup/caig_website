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
      console.log(`Header lines: ${header_lines}`);
      const blog_metadata: any = {};
      for (const header_line of header_lines) {
        const [json_title, json_info] = header_line.split(': ');
        blog_metadata[json_title] = json_info;
      }

      blog_metadata['slug'] = dir_name;

      return blog_metadata;
    }).filter((blog_metadata) => {
      if (blog_metadata['published'] === 'false') {
        return false;
      }

      return true;
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
      message: error,
    }
  }
}


// export async function getStaticPropsBlogs(): Promise<ReturnStatus> {
//   try {
//     const filePath = path.join('public', 'content', 'metadata.json');
//     // const fileContents = fs.readFileSync(filePath, 'utf8');
//     // const metadata = JSON.parse(fileContents);
//     const file3 =
//     const file2 = path.resolve(__dirname, '../../public/content/metadata.json');
//     const file = path.join(process.cwd(), '/public/content/metadata.json');
//     console.log(file);
//     console.log(file2);
//     // const blogsMetadata = fs.readFileSync(file, 'utf-8');
//     const blogsMetadata = fs.readFileSync(file2, 'utf-8');
//     console.log(blogsMetadata);
//     const blogPosts: BlogMetadata[] = JSON.parse(blogsMetadata)

//     return {
//       status: 200,
//       statusMessage: "success",
//       output: blogPosts,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: 404,
//       statusMessage: "error",
//       output: null,
//     };
//   }
// }

// export async function getStaticProps({ params: { slug } }) {
//   const markdownWithMeta = fs.readFileSync(
//     path.join('posts', slug + '.md'),
//     'utf-8'
//   )

//   const { data: frontmatter, content } = matter(markdownWithMeta)

//   return {
//     props: {
//       frontmatter,
//       slug,
//       content,
//     },
//   }
// }
