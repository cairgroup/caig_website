import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const file_name = searchParams.get("fileName");

    if (!file_name) {
      throw new Error("File name is missing");
    }

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.BLOG_FILE_PATH}/${file_name}/${file_name}.md`
    );

    if (!request.ok) {
      throw new Error(
        `Failed to fetch /${process.env.BLOG_FILE_PATH}/${file_name}/${file_name}.md: ${request.statusText}`
      );
    }

    const file = await request.text();

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
