import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const GET = async () => {
  try {
    // 1) 로컬 파일 읽기 (루트에 default.jpg)
    const filePath = path.join(process.cwd(), "default.jpg");
    const fileBuffer = fs.readFileSync(filePath);

    // 2) presigned URL (여기에 발급받은 URL을 그대로 넣으세요)
    const uploadUrl =
      "https://achiva-s3-bucket.s3.ap-northeast-2.amazonaws.com/70350cda-00e1-475b-aa63-a27388f65cdb?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250805T075244Z&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Credential=AKIAUT3ZMJQPU5VRS6VR%2F20250805%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=600&X-Amz-Signature=945e21ac81166a11b0ff0a55b1a01b31712c16a346910bc30175b04c9232b424";

    // 3) S3에 PUT
    const s3res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg", // default.jpg 가 JPEG 이면
      },
      body: fileBuffer,
    });
    console.log(s3res);

    if (!s3res.ok) {
      throw new Error(`S3 업로드 실패 (status ${s3res.status})`);
    }

    // 4) 결과 반환 (public URL 과 상태코드)
    const publicUrl = uploadUrl.split("?")[0];
    console.log("✅ 업로드 성공:", publicUrl);
    return NextResponse.json({ ok: true, publicUrl, status: s3res.status });
  } catch (err) {
    console.error("❌ 업로드 에러:", err);
    return NextResponse.json({ ok: false, error: err }, { status: 500 });
  }
};
