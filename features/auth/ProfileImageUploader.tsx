import { useState } from "react";

export default function ProfileImageUploader() {
  const [file, setFile] = useState(null);

  // 1) 파일 선택
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={async () => {
          try {
            const response = await fetch(
              "https://achiva-s3-bucket.s3.ap-northeast-2.amazonaws.com/bfcf42e1-e931-4b72-af01-c9d6a510e296?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250805T070158Z&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Credential=AKIAUT3ZMJQPU5VRS6VR%2F20250805%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=600&X-Amz-Signature=ca72801d1ea800e9425c2f7087a9fb8bea6d658bffe9ea0a77aad6781f2c300b",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "image/jpeg",
                },
                body: file,
              }
            );
            if (!response.ok) {
              throw new Error("에러");
            }
            const result = await response.json();
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Test
      </button>
    </>
  );
}
