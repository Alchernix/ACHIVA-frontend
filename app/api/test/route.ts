import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const GET = async () => {
  try {
    // 1) 로컬 파일 읽기 (루트에 default.jpg)
    const filePath = path.join(process.cwd(), "default.png");
    const fileBuffer = fs.readFileSync(filePath);

    // 2) presigned URL (여기에 발급받은 URL을 그대로 넣으세요)
    const uploadUrl =
      "https://achivadata.s3.ap-northeast-2.amazonaws.com/3cec01dd-c626-4348-8ebd-22d8e653f5e4";

    // 3) S3에 PUT
    const s3res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "image/png",
      },
      body: fileBuffer,
    });
    // console.log(s3res);

    if (!s3res.ok) {
      throw new Error(`S3 업로드 실패 (status ${s3res.status})`);
    }

    // 4) 결과 반환 (public URL 과 상태코드)
    const publicUrl = uploadUrl.split("?")[0];
    // console.log("✅ 업로드 성공:", publicUrl);
    return NextResponse.json({ ok: true, publicUrl, status: s3res.status });
  } catch (err) {
    // console.error("❌ 업로드 에러:", err);
    return NextResponse.json({ ok: false, error: err }, { status: 500 });
  }
};
