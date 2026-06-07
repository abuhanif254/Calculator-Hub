import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const optimizeStr = formData.get("optimize") as string | null;
    
    if (!file) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    
    // Load source document
    const srcDoc = await PDFDocument.load(arrayBuffer, { 
      ignoreEncryption: true,
      updateMetadata: false
    });

    // 1) Rebuild PDF tree to discard unreferenced objects (orphan fonts, deleted elements)
    const newDoc = await PDFDocument.create();
    const pageIndices = srcDoc.getPageIndices();
    const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
    copiedPages.forEach((page) => newDoc.addPage(page));

    // 2) Strip document metadata info streams
    newDoc.setTitle("");
    newDoc.setAuthor("");
    newDoc.setSubject("");
    newDoc.setCreator("");
    newDoc.setProducer("");
    // Use epoch dates to optimize metadata representation bytes
    newDoc.setCreationDate(new Date(0));
    newDoc.setModificationDate(new Date(0));

    // 3) Compress object streams
    const isOptimized = optimizeStr !== "false";
    const compressedBytes = await newDoc.save({
      useObjectStreams: isOptimized,
      addDefaultPage: false,
    });

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/pdf");
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="${file.name.replace(/\.[^/.]+$/, "")}_compressed.pdf"`
    );

    return new NextResponse(compressedBytes as any, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("Server-side PDF compression failure:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process PDF compression on server." },
      { status: 500 }
    );
  }
}
