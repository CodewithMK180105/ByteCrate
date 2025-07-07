import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const width = parseInt(formData.get("width") as string);
    const height = parseInt(formData.get("height") as string);

    if (!file || !width || !height) {
      return NextResponse.json({ error: "Missing file, width, or height" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const outputBuffer = await sharp(buffer)
      .resize({ width, height, fit: "contain" })
      .toBuffer();

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${file.type.split("/")[1]}`,
        "Content-Disposition": `attachment; filename="resized.${file.type.split("/")[1]}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Image resizing failed" }, { status: 500 });
  }
}