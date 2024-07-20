"use server";

import * as fs from 'fs';
import { ReturnStatus } from '@/lib/server-action';

export async function getFile({ file_name } : { file_name: string }): Promise<ReturnStatus> {
  try {
    const file = fs.readFileSync(`app/blogs/content/${file_name}/${file_name}.md`, 'utf-8');

    return {
      status: 200,
      statusMessage: "success",
      output: file,
    };
  } catch (error) {
    return {
      status: 404,
      statusMessage: "error",
      output: null,
    };
  }
}
