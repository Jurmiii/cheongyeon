import Content5 from "../Content5/Content5";
import Content6 from "../Content6/Content6";
import MainContentBox from "../MainContentBox/MainContentBox";
import ProductContentBox from "../ProductContentBox/ProductContentBox";
import ReviewContentBox from "../ReviewContentBox/ReviewContentBox";
import TeaClassContentBox from "../TeaClassContentBox/TeaClassContentBox";

export type ContentBoxAlias = "content1" | "content2" | "content3" | "content4" | "content5" | "content6";

export const contentBoxAliases: Record<ContentBoxAlias, string> = {
  content1: "MainContentBox",
  content2: "TeaClassContentBox",
  content3: "ProductContentBox",
  content4: "ReviewContentBox",
  content5: "Content5",
  content6: "Content6",
};

const contentBoxComponents = {
  content1: MainContentBox,
  content2: TeaClassContentBox,
  content3: ProductContentBox,
  content4: ReviewContentBox,
  content5: Content5,
  content6: Content6,
};

interface ContentBoxProps {
  name: ContentBoxAlias;
}

export default function ContentBox({ name }: ContentBoxProps) {
  const Component = contentBoxComponents[name];

  return <Component />;
}
