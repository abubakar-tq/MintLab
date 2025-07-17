// app/api/upload/route.js
import { NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,

  pinataGateway: process.env.PINATA_GATEWAY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const name = formData.get("name");
    const description = formData.get("description");
    const rawAttributes = formData.get("attributes") || "[]";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ Upload the file
    const fileUploadResult = await pinata.upload.public.file(file); // file is a File object from FormData
    const imageCID = fileUploadResult.cid;

    const imageIpfsUrl = `ipfs://${imageCID}`;

    // ✅ Parse attributes
    let attributes = [];
    try {
      const parsed = JSON.parse(rawAttributes);
      attributes = Array.isArray(parsed) ? parsed : [...parsed];
    } catch (err) {
      console.error("Invalid attributes:", err);
    }

    // ✅ Create metadata JSON
    const metadata = {
      name,
      description,
      image: imageIpfsUrl,
      attributes,
    };

    // ✅ Upload metadata
    const metadataUpload = await pinata.upload.public.json(metadata);
    const metadataCID = metadataUpload.cid;

    return NextResponse.json({
      url: `ipfs://${metadataCID}`,
      metadata,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
