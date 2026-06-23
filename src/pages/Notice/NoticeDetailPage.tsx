import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Badge, Button } from "../../components/common";
import { getNoticeById } from "../../data/notices";
import "./NoticeDetailPage.scss";

function NoticeDetailPage() {
  const { noticeId } = useParams();
  const notice = getNoticeById(Number(noticeId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [noticeId]);

  if (!notice) {
    return <Navigate to="/event/notice" replace />;
  }

  return (
    <main className="notice-detail-page">
      <section className="notice-detail" aria-label="공지사항 상세">
        <div className="notice-detail__grid">
          <header className="notice-detail__head">
            <Badge className="notice-detail__badge" variant="ba1">
              {notice.category}
            </Badge>
            <div className="notice-detail__intro">
              <h1 className="notice-detail__title ft-48b ink500">{notice.title}</h1>
              <p className="notice-detail__summary ft-36r ink500">{notice.description}</p>
            </div>
          </header>
          <div className="notice-detail__content">
            <div className="notice-detail__divider" aria-hidden="true" />
            <p className="notice-detail__body ft-18r ink500">{notice.body}</p>
            <div className="notice-detail__divider" aria-hidden="true" />
          </div>
          <div className="notice-detail__actions">
            <Link className="notice-detail__back-link" to="/event/notice#notice-list">
              <Button className="notice-detail__back-button" variant="btn1">
                목록으로
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NoticeDetailPage;
