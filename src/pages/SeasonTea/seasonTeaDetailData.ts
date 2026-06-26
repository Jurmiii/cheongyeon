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
  /** 섹션 타이틀과 동일한 유틸리티 색상 클래스 */
  titleColorClass: "plum500" | "deep400" | "color-fall" | "color-winter";
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
  titleColorClass: "plum500",
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

export const summerTeaDetail: SeasonTeaDetail = {
  id: "summer",
  title: "냉녹차",
  titleColorClass: "deep400",
  tagline: "여름의 열기를 가장 맑게 식히는 차",
  storyTitle: "차의 이야기",
  storyParagraphs: [
    "냉녹차는 녹차를 차갑게 우려내어 맑고 깨끗한 풍미를 더욱 선명하게 즐기는 차입니다.",
    "뜨겁게 우린 녹차와는 또 다른 매력을 지니며, 은은한 풀 향과 부드러운 감칠맛이 조화를 이루어 무더운 계절에도 부담 없이 마실 수 있습니다.",
    "차갑게 우러난 녹차는 떫은맛은 줄이고 청량한 향과 깔끔한 여운을 남겨 여름날의 열기와 피로를 부드럽게 식혀줍니다.",
  ],
  sensoryRows: [
    {
      label: "향",
      rangeLabel: "풀향, 청량함",
      leftLabel: "은은함",
      rightLabel: "풍부함",
      leftPercent: 20,
    },
    {
      label: "맛",
      rangeLabel: "산뜻함, 깔끔함",
      leftLabel: "부드러움",
      rightLabel: "깊은 풍미",
      leftPercent: 40,
    },
    {
      label: "여운",
      rangeLabel: "맑게 남음",
      leftLabel: "짧게 남음",
      rightLabel: "길게 남음",
      leftPercent: 30,
    },
  ],
  recommendTitle: "추천 정보",
  recommendTimeLabel: "추천 시간",
  recommendTime: "오전 10시 ~ 오후 4시",
  recommendTimeNote: "더운 날, 기분 전환이 필요할 때",
  recommendAudienceLabel: "추천 대상",
  recommendAudience: ["깔끔한 차를 좋아하는 분", "시원한 음료를 찾는 분", "녹차를 처음 접하는 분"],
  brewTitle: "우림 가이드",
  brewTemperatureLabel: "온도",
  brewTemperature: "70 ~ 75°C",
  brewDurationLabel: "시간",
  brewDuration: "2분 ~ 3분 (*냉침 3~4시간)",
  brewCountLabel: "횟수",
  brewCount: "2 ~ 3회 우림 가능",
};

export const autumnTeaDetail: SeasonTeaDetail = {
  id: "autumn",
  title: "국화차",
  titleColorClass: "color-fall",
  tagline: "가을의 여운을 가장 천천히 머금는 차",
  storyTitle: "차의 이야기",
  storyParagraphs: [
    "국화차는 가을에 피어난 국화 꽃잎을 우려내어 은은한 꽃향과 부드러운 풍미를 즐기는 차입니다.",
    "잔 위로 퍼지는 국화의 향은 화려하기보다 차분하게 다가오며, 분주했던 하루의 마음을 천천히 가라앉혀 줍니다.",
    "차 한 잔이 필요한 늦은 오후, 국화차는 계절의 여운을 가장 부드럽게 전해줍니다.",
  ],
  sensoryRows: [
    {
      label: "향",
      rangeLabel: "꽃향, 은은함",
      leftLabel: "은은함",
      rightLabel: "풍부함",
      leftPercent: 80,
    },
    {
      label: "맛",
      rangeLabel: "담백함, 부드러움",
      leftLabel: "부드러움",
      rightLabel: "깊은 풍미",
      leftPercent: 75,
    },
    {
      label: "여운",
      rangeLabel: "길게 남음",
      leftLabel: "짧게 남음",
      rightLabel: "길게 남음",
      leftPercent: 15,
    },
  ],
  recommendTitle: "추천 정보",
  recommendTimeLabel: "추천 시간",
  recommendTime: "오후 2시 ~ 6시",
  recommendTimeNote: "하루를 천천히 정리하고 싶을 때",
  recommendAudienceLabel: "추천 대상",
  recommendAudience: ["꽃향을 좋아하는 분", "차분한 휴식을 원하는 분", "카페인 부담이 적은 차를 찾는 분"],
  brewTitle: "우림 가이드",
  brewTemperatureLabel: "온도",
  brewTemperature: "85 ~ 90°C",
  brewDurationLabel: "시간",
  brewDuration: "2분 ~ 3분",
  brewCountLabel: "횟수",
  brewCount: "2 ~ 3회 우림 가능",
};

export const winterTeaDetail: SeasonTeaDetail = {
  id: "winter",
  title: "우롱차",
  titleColorClass: "color-winter",
  tagline: "겨울의 온기를 가장 깊게 채우는 차",
  storyTitle: "차의 이야기",
  storyParagraphs: [
    "우롱차는 녹차와 홍차의 중간 정도로 발효된 차로, 은은한 꽃향과 깊은 풍미가 조화를 이루는 차입니다.",
    "첫 모금은 맑고 부드럽게 시작되지만, 시간이 지날수록 풍성한 향과 깊은 맛이 천천히 펼쳐져 한 잔의 차를 오래 음미하게 만듭니다.",
    "겨울의 고요한 풍경 속에서 마시는 우롱차는 계절의 깊이를 가장 차분하게 느끼게 해주는 차입니다.",
  ],
  sensoryRows: [
    {
      label: "향",
      rangeLabel: "구수한 향, 은은함",
      leftLabel: "은은함",
      rightLabel: "풍부함",
      leftPercent: 20,
    },
    {
      label: "맛",
      rangeLabel: "깊고, 풍부한 풍미",
      leftLabel: "부드러움",
      rightLabel: "깊은 풍미",
      leftPercent: 0,
    },
    {
      label: "여운",
      rangeLabel: "길게 남음",
      leftLabel: "짧게 남음",
      rightLabel: "길게 남음",
      leftPercent: 15,
    },
  ],
  recommendTitle: "추천 정보",
  recommendTimeLabel: "추천 시간",
  recommendTime: "오후 4시 ~ 21시",
  recommendTimeNote: "하루를 마무리하며 휴식이 필요할 때",
  recommendAudienceLabel: "추천 대상",
  recommendAudience: [
    "깊은 풍미의 차를 좋아하는 분",
    "따뜻한 차를 천천히 즐기고 싶은 분",
    "녹차보다 진한 맛을 찾는 분",
  ],
  brewTitle: "우림 가이드",
  brewTemperatureLabel: "온도",
  brewTemperature: "90 ~ 95°C",
  brewDurationLabel: "시간",
  brewDuration: "2분 ~ 3분",
  brewCountLabel: "횟수",
  brewCount: "2 ~ 3회 우림 가능",
};
