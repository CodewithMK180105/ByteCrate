import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  try {
    const { text, format, size } = await req.json();

    if (!text || !format) {
      return NextResponse.json({ error: "Missing text or format" }, { status: 400 });
    }

    const qrSize = size === "small" ? 200 : size === "medium" ? 400 : 600;
    const buffer = await QRCode.toBuffer(text, {
      type: format,
      width: qrSize,
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="qrcode.${format}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "QR code generation failed" }, { status: 500 });
  }
}