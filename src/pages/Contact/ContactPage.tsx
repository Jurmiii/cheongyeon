import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import noticeImg from "../../assets/images/13my-page/notice-img.webp";
import { Button, CustomModal, Icon, Input } from "../../components/common";
import { isValidEmail, isValidPhone, normalizePhone } from "../../utils/validation";
import "./ContactPage.scss";

const INQUIRY_TYPES = ["클래스 문의", "예약 문의", "결제 문의", "환불 문의", "기타 문의"] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

type ContactFieldErrors = Partial<
  Record<"name" | "phone" | "email" | "type" | "content" | "agree", string>
>;

function isValidContactPhone(value: string) {
  return isValidPhone(value) || normalizePhone(value).length === 11;
}

function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState<InquiryType | null>(null);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const validateContactForm = () => {
    const nextErrors: ContactFieldErrors = {};

    if (!name.trim()) {
      nextErrors.name = "이름을 입력해주세요.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "연락처를 입력해주세요.";
    } else if (!isValidContactPhone(phone)) {
      nextErrors.phone = "올바른 연락처 형식으로 입력해주세요.";
    }

    if (!email.trim()) {
      nextErrors.email = "이메일을 입력해주세요.";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "올바른 이메일 형식으로 입력해주세요.";
    }

    if (!selectedType) {
      nextErrors.type = "문의 유형을 선택해주세요.";
    }

    if (!content.trim()) {
      nextErrors.content = "문의 내용을 입력해주세요.";
    }

    if (!agree) {
      nextErrors.agree = "개인정보수집 및 이용방침에 동의해주세요.";
    }

    return nextErrors;
  };

  const clearError = (field: keyof ContactFieldErrors) => {
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateContactForm();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsCompleteModalOpen(false);
      return;
    }

    setIsCompleteModalOpen(true);
  };

  const handleTypeSelect = (type: InquiryType) => {
    setSelectedType(type);
    clearError("type");
    setIsTypeOpen(false);
  };

  return (
    <main className="contact-page">
      <button className="contact__close-button" type="button" aria-label="이전 페이지로 이동" onClick={() => navigate(-1)}>
        <span aria-hidden="true">×</span>
      </button>
      <section className="contact" aria-label="문의하기">
        <div className="contact__inner">
          <aside className="contact__intro" style={{ backgroundImage: `url(${noticeImg})` }}>
            <h1 className="contact__title ft-36b ink500">문의하기</h1>
            <p className="contact__description ft-18r ink500">
              궁금하신 점이 있으시면 언제든지 문의해주세요
              <br />
              빠르고 정확하게 답변드리겠습니다.
            </p>
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
                  state={errors.name ? "in3" : "in1"}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  onChange={(event) => {
                    setName(event.target.value);
                    clearError("name");
                  }}
                  autoComplete="name"
                />
                {errors.name ? (
                  <p className="contact__error ft-14r" id="contact-name-error" role="alert">
                    {errors.name}
                  </p>
                ) : null}
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
                  state={errors.phone ? "in3" : "in1"}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    clearError("phone");
                  }}
                  autoComplete="tel"
                />
                {errors.phone ? (
                  <p className="contact__error ft-14r" id="contact-phone-error" role="alert">
                    {errors.phone}
                  </p>
                ) : null}
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
                state={errors.email ? "in3" : "in1"}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError("email");
                }}
                autoComplete="email"
              />
              {errors.email ? (
                <p className="contact__error ft-14r" id="contact-email-error" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="contact__field">
              <span className="contact__label ft-18b ink500">문의 유형</span>
              <div
                className={["contact__select-wrap", isTypeOpen && "contact__select-wrap--open"]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  className={["contact__select", "ft-16r", errors.type && "contact__select--error"]
                    .filter(Boolean)
                    .join(" ")}
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isTypeOpen}
                  aria-invalid={Boolean(errors.type)}
                  aria-describedby={errors.type ? "contact-type-error" : undefined}
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
              {errors.type ? (
                <p className="contact__error ft-14r" id="contact-type-error" role="alert">
                  {errors.type}
                </p>
              ) : null}
            </div>

            <div className="contact__field">
              <label className="contact__label ft-18b ink500" htmlFor="contact-content">
                문의내용
              </label>
              <textarea
                id="contact-content"
                className={["contact__textarea", "ft-16r", errors.content && "contact__textarea--error"]
                  .filter(Boolean)
                  .join(" ")}
                name="content"
                placeholder="문의 내용을 입력해주세요"
                value={content}
                aria-invalid={Boolean(errors.content)}
                aria-describedby={errors.content ? "contact-content-error" : undefined}
                onChange={(event) => {
                  setContent(event.target.value);
                  clearError("content");
                }}
              />
              {errors.content ? (
                <p className="contact__error ft-14r" id="contact-content-error" role="alert">
                  {errors.content}
                </p>
              ) : null}
            </div>

            <div className="contact__agree-wrap">
              <label className="contact__agree ft-16r ink500">
                <input
                  className="contact__checkbox"
                  type="checkbox"
                  name="agree"
                  checked={agree}
                  aria-invalid={Boolean(errors.agree)}
                  aria-describedby={errors.agree ? "contact-agree-error" : undefined}
                  onChange={(event) => {
                    setAgree(event.target.checked);
                    clearError("agree");
                  }}
                />
                개인정보수집 및 이용방침에 동의합니다.
              </label>
              {errors.agree ? (
                <p className="contact__error ft-14r" id="contact-agree-error" role="alert">
                  {errors.agree}
                </p>
              ) : null}
            </div>

            <Button className="contact__submit" variant="btn1" type="submit">
              문의 보내기
            </Button>

            <p className="contact__hours ft-16r ink300">
              평일 09:00~18:00 운영 | 최대 1~2일 이내 답변 드리겠습니다.
            </p>
          </form>
        </div>
      </section>

      <CustomModal isOpen={isCompleteModalOpen} onClose={() => setIsCompleteModalOpen(false)}>
        <section className="contact-complete-modal" aria-label="문의 접수 완료">
          <h2 className="contact-complete-modal__title ft-36b ink500">문의가 접수되었습니다.</h2>
          <p className="contact-complete-modal__description ft-18r ink500">
            빠르고 정확하게 답변드리겠습니다.
          </p>
          <Button
            className="contact-complete-modal__button"
            variant="btn1"
            type="button"
            onClick={() => navigate("/mypage")}
          >
            확인
          </Button>
        </section>
      </CustomModal>
    </main>
  );
}

export default ContactPage;
