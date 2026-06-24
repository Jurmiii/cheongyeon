export type SeasonTeaSensoryRow = {
  label: string;
  rangeLabel: string;
  leftLabel: string;
  rightLabel: string;
  /** 왼쪽 라벨 비율 (0–100). 오른쪽은 100 - leftPercent */
  leftPercent: number;
};

export type SeasonTeaDetail = {
  id: string;
  title: string;
  tagline: string;
  storyTitle: string;
  storyParagraphs: string[];
  sensoryRows: SeasonTeaSensoryRow[];
  recommendTitle: string;
  recommendTimeLabel: string;
  recommendTime: string;
  recommendTimeNote: string;
  recommendAudienceLabel: string;
  recommendAudience: string[];
  brewTitle: string;
  brewTemperatureLabel: string;
  brewTemperature: string;
  brewDurationLabel: string;
  brewDuration: string;
  brewCountLabel: string;
  brewCount: string;
};

export const springTeaDetail: SeasonTeaDetail = {
  id: "spring",
  title: "동백꽃 차",
  tagline: "봄의 기운을 가장 먼저 하는 차",
  storyTitle: "차의 이야기",
  storyParagraphs: [
    "봄철에만 잠깐 피어나는 동백꽃을 정성껏 채취해, 은은한 꽃향기를 차에 담았습니다.",
    "향은 부드럽고 맑게 퍼지고, 맛은 자극 없이 깨끗한 여운을 남깁니다.",
    "한 잔이면 계절의 기운이 천천히 마음속에 번져, 마음까지 차분해지는 시간을 선사합니다.",
  ],
  sensoryRows: [
    {
      label: "향",
      rangeLabel: "꽃향, 은은함",
      leftLabel: "은은함",
      rightLabel: "풍부함",
      leftPercent: 70,
    },
    {
      label: "맛",
      rangeLabel: "산뜻함, 부드러움",
      leftLabel: "부드러움",
      rightLabel: "깊은 풍미",
      leftPercent: 60,
    },
    {
      label: "여운",
      rangeLabel: "길게 남음",
      leftLabel: "짧게 남음",
      rightLabel: "길게 남음",
      leftPercent: 30,
    },
  ],
  recommendTitle: "추천 정보",
  recommendTimeLabel: "추천 시간",
  recommendTime: "오전 9시 ~ 11시",
  recommendTimeNote: "하루를 차분하게 시작하고 싶을 때",
  recommendAudienceLabel: "추천 대상",
  recommendAudience: ["꽃향을 좋아하는 분", "부드러운 녹차를 선호하는 분", "차를 처음 접하는 분"],
  brewTitle: "우림 가이드",
  brewTemperatureLabel: "온도",
  brewTemperature: "75 ~ 80°C",
  brewDurationLabel: "시간",
  brewDuration: "1분 30초",
  brewCountLabel: "횟수",
  brewCount: "2 ~ 3회 우림 가능",
};
