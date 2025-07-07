import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const format = formData.get("format") as string;
    const quality = parseInt(formData.get("quality") as string) || 80;

    if (!file || !format) {
      return NextResponse.json({ error: "Missing file or format" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let sharpInstance = sharp(buffer);

    // Convert to specified format with quality
    if (format === "jpg" || format === "jpeg") {
      sharpInstance = sharpInstance.jpeg({ quality });
    } else if (format === "png") {
      sharpInstance = sharpInstance.png({ quality });
    } else if (format === "webp") {
      sharpInstance = sharpInstance.webp({ quality });
    } else if (format === "gif") {
      sharpInstance = sharpInstance.gif();
    // } else if (format === "bmp") {
    //   sharpInstance = sharpInstance.bmp();
    } else {
      return NextResponse.json({ error: "Unsupported format" }, { status: 400 });
    }

    const outputBuffer = await sharpInstance.toBuffer();
    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Image conversion failed" }, { status: 500 });
  }
}