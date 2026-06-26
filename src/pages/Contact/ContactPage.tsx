import { useState } from "react";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Icon, Input } from "../../components/common";
import "./ContactPage.scss";

const INQUIRY_TYPES = ["클래스 문의", "예약 문의", "결제 문의", "환불 문의", "기타 문의"] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState<InquiryType | null>(null);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleTypeSelect = (type: InquiryType) => {
    setSelectedType(type);
    setIsTypeOpen(false);
  };

  return (
    <main className="contact-page">
      <section className="contact" aria-label="문의하기">
        <div className="contact__inner">
          <aside className="contact__intro">
            <h1 className="contact__title ft-36b">문의하기</h1>
            <p className="contact__description ft-18r">
              궁금하신 점이 있으시면 언제든지 문의해주세요
              <br />
              빠르고 정확하게 답변드리겠습니다.
            </p>
            <div className="contact__intro-image" aria-hidden="true">
              <FontAwesomeIcon icon={faImage} />
            </div>
          </aside>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__row">
              <div className="contact__field">
                <label className="contact__label ft-18b ink500" htmlFor="contact-name">
                  이름
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="이름을 입력해주세요"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="contact__field">
                <label className="contact__label ft-18b ink500" htmlFor="contact-phone">
                  연락처
                </label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="연락처를 입력해주세요"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label ft-18b ink500" htmlFor="contact-email">
                이메일
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="contact__field">
              <span className="contact__label ft-18b ink500">문의 유형</span>
              <div
                className={["contact__select-wrap", isTypeOpen && "contact__select-wrap--open"]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  className="contact__select ft-16r"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isTypeOpen}
                  onClick={() => setIsTypeOpen((open) => !open)}
                >
                  <span
                    className={["contact__select-label", !selectedType && "contact__select-label--placeholder"]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {selectedType ?? "문의 유형을 선택해주세요"}
                  </span>
                  <Icon className="contact__select-icon" name="angle-down" aria-hidden="true" />
                </button>
                <ul className="contact__select-menu" role="listbox" aria-label="문의 유형 선택">
                  {INQUIRY_TYPES.map((type) => (
                    <li key={type}>
                      <button
                        className={[
                          "contact__select-option",
                          "ft-16r",
                          type === selectedType && "contact__select-option--active",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        role="option"
                        aria-selected={type === selectedType}
                        onClick={() => handleTypeSelect(type)}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label ft-18b ink500" htmlFor="contact-content">
                문의내용
              </label>
              <textarea
                id="contact-content"
                className="contact__textarea ft-16r"
                name="content"
                placeholder="문의 내용을 입력해주세요"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>

            <label className="contact__agree ft-16r ink500">
              <input
                className="contact__checkbox"
                type="checkbox"
                name="agree"
                checked={agree}
                onChange={(event) => setAgree(event.target.checked)}
              />
              개인정보수집 및 이용방침에 동의합니다.
            </label>

            <Button className="contact__submit" variant="btn1" type="submit">
              문의 보내기
            </Button>

            <p className="contact__hours ft-16r ink300">
              평일 09:00~18:00 운영 | 최대 1~2일 이내 답변 드리겠습니다.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
