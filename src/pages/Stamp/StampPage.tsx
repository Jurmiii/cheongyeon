import { useNavigate } from "react-router-dom";

import MyPage from "../MyPage/MyPage";
import StampModal from "./StampModal";
import "./StampPage.scss";

function StampPage() {
  const navigate = useNavigate();

  const closeStamp = () => {
    navigate("/mypage");
  };

  return (
    <div className="stamp-page">
      <div className="stamp-page__background" aria-hidden="true">
        <MyPage />
      </div>

      <StampModal onClose={closeStamp} />
    </div>
  );
}

export default StampPage;
