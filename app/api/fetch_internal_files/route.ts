import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const file_name = searchParams.get("fileName");

    if (!file_name) {
      throw new Error("File name is missing");
    }

    // Use async/await to read the file
    const file = await fs.readFile(`content/${file_name}/${file_name}.md`, 'utf-8');

    return NextResponse.json({
      status: 200,
      statusMessage: "success",
      output: file,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 404,
      statusMessage: error.message,
      output: null,
    });
  }
}
