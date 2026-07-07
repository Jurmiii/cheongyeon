import { useNavigate } from "react-router-dom";

import MyPage from "../MyPage/MyPage";
import PageMeta from "../../components/seo/PageMeta";
import { PAGE_SEO } from "../../data/pageSeoMeta";
import StampModal from "./StampModal";
import "./StampPage.scss";

function StampPage() {
  const navigate = useNavigate();

  const closeStamp = () => {
    navigate("/mypage");
  };

  return (
    <div className="stamp-page">
      <PageMeta {...PAGE_SEO.stamp} />
      <div className="stamp-page__background" aria-hidden="true">
        <MyPage />
      </div>

      <StampModal onClose={closeStamp} />
    </div>
  );
}

export default StampPage;
