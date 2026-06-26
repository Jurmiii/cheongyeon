export type TeaCollectionModalSpec = {
  label: string;
  value: string;
};

export type TeaCollectionModalData = {
  title: string;
  summary: string;
  weight: string;
  price: string;
  description: string;
  specs: TeaCollectionModalSpec[];
  recommendations: string[];
};

export const previewTeaCollectionModalData: TeaCollectionModalData = {
  title: "우전",
  summary: "깊은 향과 부드러운 맛",
  weight: "40g",
  price: "35,000원",
  description: "맑고 섬세한 향과 은은한 감칠맛이 어우러집니다.\n봄의 첫 기운을 담아 섬세한 여운을 남깁니다.",
  specs: [
    { label: "종류", value: "녹차" },
    { label: "원산지", value: "전라남도 보성" },
    { label: "수확시기", value: "4월 초" },
    { label: "추천음용", value: "70ºC/2분" },
    { label: "보관방법", value: "서늘하고 건조한 곳" },
  ],
  recommendations: [
    "은은한 향을 선호하시는 분",
    "가벼운 식사와 함께 즐기고 싶은 분",
    "하루를 시작하는 상쾌한 차를 찾는 분",
  ],
};
