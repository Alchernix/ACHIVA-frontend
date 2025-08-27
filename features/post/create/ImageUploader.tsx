// 중복 로직 정리 필요....!!!
"use client";

import { useState, useCallback, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import { LoadingIcon } from "@/components/Icons";
import { NextStepButton } from "./Buttons";
import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";

type Props = {
  /** 업로드 시 FormData 필드명 (백엔드 요구사항에 맞게) */
  fieldName?: string;
  isMobile?: boolean;
};

export default function ImageUploader({
  fieldName = "file",
  isMobile = false,
}: Props) {
  // 모바일일 땐 화면 너비에서 px-5만큼 뺀 값
  const size = window.innerWidth < 640 ? window.innerWidth - 40 : 480;
  const setPost = useDraftPostStore.use.setPost();
  const handleNextStep = useCreatePostStepStore.use.handleNextStep();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [crop, setCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const dialog = useRef<HTMLDialogElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);

  /** 파일 선택 -> dataURL로 미리보기 세팅 */
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    try {
      const dataUrl = await readFileAsDataURL(file);
      setOriginalFile(file);
      setImageSrc(dataUrl);
      // setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch {
      alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  /** 크롭 결과 픽셀 영역 저장 */
  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  /** 업로드 처리 */
  const onUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) {
      alert("이미지를 선택해주세요.");
      return;
    }
    setIsUploading(true);
    try {
      const blob = await getCroppedBlob(
        imageSrc,
        croppedAreaPixels,
        originalFile?.type
      );
      const fileNameBase = (originalFile?.name ?? "image")
        .replace(/\.[^/.]+$/, "")
        .slice(0, 80);
      const ext = mimeToExt(blob.type) || "jpg";
      const croppedFile = new File([blob], `${fileNameBase}-cropped.${ext}`, {
        type: blob.type,
      });

      const formData = new FormData();
      formData.append(fieldName, croppedFile);

      // 같은 오리진의 Next API 라우트로 업로드 (프록시)
      const res = await fetch("/api/posts/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "업로드 실패");

      dialog.current?.close();
      // 필요 시 상태 초기화
      setPost({ titleImageUrl: data.url });
      handleNextStep();
      resetAll();
    } catch (e) {
      alert("업로드 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetAll = () => {
    setImageSrc(null);
    setOriginalFile(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {!imageSrc && (
        <div className="aspect-square w-full sm:w-120 flex flex-col justify-center items-center gap-2 mb-5">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M67.25 0.0625H4.75C3.5068 0.0625 2.31451 0.55636 1.43544 1.43544C0.55636 2.31451 0.0625 3.5068 0.0625 4.75V67.25C0.0625 68.4932 0.55636 69.6855 1.43544 70.5646C2.31451 71.4436 3.5068 71.9375 4.75 71.9375H67.25C68.4932 71.9375 69.6855 71.4436 70.5646 70.5646C71.4436 69.6855 71.9375 68.4932 71.9375 67.25V4.75C71.9375 3.5068 71.4436 2.31451 70.5646 1.43544C69.6855 0.55636 68.4932 0.0625 67.25 0.0625ZM3.1875 67.25V4.75C3.1875 4.3356 3.35212 3.93817 3.64515 3.64515C3.93817 3.35212 4.3356 3.1875 4.75 3.1875H67.25C67.6644 3.1875 68.0618 3.35212 68.3549 3.64515C68.6479 3.93817 68.8125 4.3356 68.8125 4.75V38.7344L56.5039 26.4219C56.0684 25.9849 55.551 25.6381 54.9812 25.4016C54.4114 25.165 53.8005 25.0432 53.1836 25.0432C52.5667 25.0432 51.9558 25.165 51.386 25.4016C50.8162 25.6381 50.2988 25.9849 49.8633 26.4219L7.48438 68.8125H4.75C4.3356 68.8125 3.93817 68.6479 3.64515 68.3549C3.35212 68.0618 3.1875 67.6644 3.1875 67.25ZM67.25 68.8125H11.9141L52.082 28.6445C52.2271 28.4993 52.3995 28.384 52.5892 28.3054C52.7788 28.2267 52.9822 28.1863 53.1875 28.1863C53.3928 28.1863 53.5962 28.2267 53.7858 28.3054C53.9755 28.384 54.1479 28.4993 54.293 28.6445L68.8125 43.1641V67.25C68.8125 67.6644 68.6479 68.0618 68.3549 68.3549C68.0618 68.6479 67.6644 68.8125 67.25 68.8125ZM23.5 31.3125C25.0452 31.3125 26.5556 30.8543 27.8404 29.9959C29.1252 29.1374 30.1265 27.9173 30.7178 26.4897C31.3091 25.0622 31.4638 23.4913 31.1624 21.9759C30.8609 20.4604 30.1169 19.0683 29.0243 17.9757C27.9317 16.8831 26.5396 16.1391 25.0241 15.8376C23.5087 15.5362 21.9378 15.6909 20.5103 16.2822C19.0827 16.8735 17.8626 17.8748 17.0041 19.1596C16.1457 20.4444 15.6875 21.9548 15.6875 23.5C15.6875 25.572 16.5106 27.5591 17.9757 29.0243C19.4409 30.4894 21.428 31.3125 23.5 31.3125ZM23.5 18.8125C24.4271 18.8125 25.3334 19.0874 26.1042 19.6025C26.8751 20.1176 27.4759 20.8496 27.8307 21.7062C28.1855 22.5627 28.2783 23.5052 28.0974 24.4145C27.9166 25.3238 27.4701 26.159 26.8146 26.8146C26.159 27.4701 25.3238 27.9166 24.4145 28.0974C23.5052 28.2783 22.5627 28.1855 21.7062 27.8307C20.8496 27.4759 20.1176 26.8751 19.6025 26.1042C19.0874 25.3334 18.8125 24.4271 18.8125 23.5C18.8125 22.2568 19.3064 21.0645 20.1854 20.1854C21.0645 19.3064 22.2568 18.8125 23.5 18.8125Z"
              fill="#412A2A"
            />
          </svg>
          <p className="text-center text-xl text-theme font-medium">
            이미지를 업로드해주세요
          </p>
        </div>
      )}

      {/* 크롭 영역 */}
      {imageSrc && (
        <div className="w-full sm:w-120">
          <div className="relative aspect-square bg-black/5 rounded-md">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              onMediaLoaded={(mediaSize) => {
                const { width, height } = mediaSize; // 원본 이미지 크기
                const zoomByWidth = size / width;
                const zoomByHeight = size / height;
                setZoom(Math.max(zoomByWidth, zoomByHeight)); // cropSize 꽉 차도록 zoom 조정
              }}
              aspect={1} // 정사각형
              cropSize={{ width: size, height: size }}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              restrictPosition={true}
              showGrid={true}
              objectFit="contain"
            />
          </div>

          {imageSrc ? (
            <button
              onClick={onUpload}
              disabled={isUploading}
              className="z-99 absolute top-2.5 right-5 sm:top-7 sm:right-17 font-semibold bg-theme text-white flex items-center justify-center h-9 w-14 border border-theme rounded-sm"
            >
              {isUploading ? <LoadingIcon /> : "다음"}
            </button>
          ) : (
            <button
              onClick={onUpload}
              disabled
              className="z-99 top-2.5 right-5 absolute sm:top-7 sm:right-17 font-semibold text-[#808080] flex items-center h-9 justify-center w-14 border border-[#d9d9d9] rounded-sm cursor-default"
            ></button>
          )}
        </div>
      )}

      <div className="mt-5 w-full">
        <NextStepButton
          disabled={!!imageSrc}
          onClick={() => input.current?.click()}
        >
          {isMobile ? "갤러리에서 선택" : "컴퓨터에서 선택"}
        </NextStepButton>
      </div>

      {/* 파일 입력 */}
      <input
        ref={input}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
}

/* -------------------- 유틸 함수들 -------------------- */

/** File -> dataURL */
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read error"));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

/**
 * react-easy-crop 결과 픽셀 영역 기준으로 캔버스 크롭
 * 반환: Blob (기본 JPEG, 가능한 경우 원본 MIME 유지)
 */
async function getCroppedBlob(
  imageSrc: string,
  crop: Area,
  preferType?: string
): Promise<Blob> {
  const image = await loadImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D 컨텍스트를 생성할 수 없습니다.");

  // 고해상도(레티나) 대응: 1:1로 충분하면 아래 1 유지
  const scale = 1;

  canvas.width = Math.floor(crop.width * scale);
  canvas.height = Math.floor(crop.height * scale);

  // drawImage의 소스 좌표/크기 = 원본 이미지 픽셀 기준
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const type = normalizeImageType(preferType) || "image/jpeg";
  const quality = type === "image/jpeg" ? 0.92 : undefined;

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), type, quality)
  );

  if (!blob) throw new Error("크롭 블랍 생성 실패");
  return blob;
}

/** dataURL/URL -> HTMLImageElement 로드 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    // CORS가 필요한 원격 이미지라면 다음 줄이 필요할 수 있음
    // img.crossOrigin = 'anonymous';
    img.src = src;
  });
}

/** mime이 이미지면 그대로, 아니면 undefined */
function normalizeImageType(type?: string) {
  if (!type) return undefined;
  return /^image\/(png|jpeg|webp|gif|avif)$/.test(type) ? type : undefined;
}

function mimeToExt(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/avif") return "avif";
  if (mime === "image/gif") return "gif";
  return "";
}
