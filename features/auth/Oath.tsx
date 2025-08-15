export const titles = [
  "우리의 공간",
  "성취를 공유해요",
  "서로를 응원해요",
  "함께 만들어요",
];

export const contents = [
  `성취를 나누고, 서로를 응원하는 새로운 공간
당신의 작은 도전과 큰 성취가 모두 빛나는 곳
이곳에서 우리는 함께 성장합니다`,
  `나의 성취를 기록하고 공유하세요
결과뿐 아니라 과정도 소중합니다
작은 걸음 하나도 우리의 박수를 받을 자격이 있습니다`,
  `칭찬과 격려는 우리의 언어입니다
비판보다 격려를, 침묵보다 따뜻한 한마디를 선택합니다
응원의 힘이 성취를 완성시킵니다`,
  `성취를 쌓아갑니다
서로를 응원합니다

아래 버튼을 눌러 Achiva의 문화에 참여하세요`,
];

export default function Oath({ currentPage }: { currentPage: number }) {
  return (
    <div className="flex flex-col gap-5 relative aspect-square w-full text-left text-white bg-[#A6736F] px-3 pt-15">
      <div className="absolute top-3.5 right-3.5 text-xs bg-black/35 rounded-full w-11 text-center py-1">
        {currentPage}/4
      </div>
      <h2 className="font-semibold text-2xl">{titles[currentPage - 1]}</h2>
      <pre className="text-xs font-[inherit]">{contents[currentPage - 1]}</pre>
    </div>
  );
}
