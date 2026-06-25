import reviewImage1 from "../assets/images/08class/class-introduction-7-1.webp";
import reviewImage2 from "../assets/images/08class/class-introduction-7-2.webp";
import reviewImage3 from "../assets/images/08class/class-introduction-7-3.webp";
import reviewImage4 from "../assets/images/08class/class-introduction-7-4.webp";
import reviewImage5 from "../assets/images/08class/class-introduction-7-5.webp";
import reviewImage6 from "../assets/images/08class/class-introduction-7-6.webp";

export interface ClassIntroductionReview {
  id: number;
  image: string;
  headline: string;
  name: string;
  body: string;
  date: string;
}

export const classIntroductionReviews: ClassIntroductionReview[] = [
  {
    id: 1,
    image: reviewImage1,
    headline: "차 맛보다 분위기가\n먼저 기억에 남았어요.",
    name: "신○○ 님",
    body:
      "공간이 조용하고 따뜻해서 들어가자마자 좋았습니다.\n차를 우리는 방법도 알려주셔서 따라가기 쉬웠어요.\n평소엔 그냥 마시던 차를 조금 다르게 보게 됐어요.\n가볍게 쉬고 싶은 날 다시 오고 싶습니다.",
    date: "2026.06.16",
  },
  {
    id: 2,
    image: reviewImage2,
    headline: "한국의 또 다른 문화를\n알고 가는 좋은 경험이었어요.",
    name: "S○○○ 님",
    body:
      "처음 한국에 놀러 왔는데, 한국 문화를 알고 싶어 검색하다가 \n 찾게 되었어요. 전통 차 문화를 배우니 마음도 차분해지고 몸도 따뜻해지는 좋은 시간이었어요. 클래스 선생님이 영어 수업이 \n 가능하셔서 편하게 경험했습니다.",
    date: "2026.06.22",
  },
  {
    id: 3,
    image: reviewImage3,
    headline: "조용해서 더 좋았던\n특별한 데이트",
    name: "박○○ 님",
    body:
      "늘 비슷한 데이트가 아쉬워 청연 다도 클래스를 예약했어요.\n차를 우리는 방법을 차근차근 알려주셔서 어렵지 않았고,\n서로에게 차를 따라주며 조용히 대화할 수 있어 오래 기억에 \n 남는 시간이었습니다.",
    date: "2026.06.22",
  },
  {
    id: 4,
    image: reviewImage4,
    headline: "차를 잘 몰라도\n편하게 즐길 수 있었어요.",
    name: "이○○ 님",
    body:
      "오랜만에 저를 위한 시간을 보내고 싶어 청연 다도 클래스를 \n 예약했어요.차를 우리는 과정이 차분하게 이어져 마음이 \n편안해졌고, 조용한 분위기 덕분에 잠시 쉬어 가는 \n좋은 시간이었습니다.",
    date: "2026.06.19",
  },
  {
    id: 5,
    image: reviewImage5,
    headline: "잠깐 쉬러 갔다가\n기분 좋게 나오게 됐어요.",
    name: "최○○ 님",
    body:
      "공간이 차분해서 앉아 있는 것만으로도 좋았어요.\n차 맛을 하나씩 느껴 보는 과정이 생각보다 재미있었습니다.\n너무 진지한 분위기가 아니라 편하게 참여할 수 있었어요.",
    date: "2026.06.23",
  },
  {
    id: 6,
    image: reviewImage6,
    headline: "친구 따라 왔다가\n제가 더 좋아했어요.",
    name: "이○○ 님",
    body:
      "친구가 관심 있어서 같이 신청했는데, 오히려 제가 더 \n 재미있게 참여한 것 같아요. 차마다 향이 달라서 비교하는 \n 재미도 있었습니다.다음에는 남자 친구랑 다시 오려고요.",
    date: "2026.07.01",
  },
];
