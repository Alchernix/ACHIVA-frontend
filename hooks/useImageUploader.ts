import { useCallback, useState } from "react";
import { Area } from "react-easy-crop";

type Props = {
  apiUrl: string; // 업로드 대상 엔드포인트
  onUploadCompleted: (url: string) => void; // 이미지 주소 받아서 상태 등 업데이트
};

export default function useImageUploader({ apiUrl, onUploadCompleted }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [crop, setCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [isUploading, setIsUploading] = useState(false);

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
      setZoom(1);
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
      formData.append("file", croppedFile);

      // 같은 오리진의 Next API 라우트로 업로드 (프록시)
      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "업로드 실패");

      onUploadCompleted(data.url);
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

  return {
    imageSrc,
    crop,
    zoom,
    isUploading,
    onFileChange,
    onCropComplete,
    onUpload,
    setCrop,
    setZoom,
    resetAll,
  };
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
