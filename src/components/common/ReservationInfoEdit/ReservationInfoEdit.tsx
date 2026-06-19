import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import Input from "../Input";
import "./ReservationInfoEdit.scss";

const fields = [
  {
    id: "reservation-name",
    label: "이름",
    name: "name",
    placeholder: "이름을 입력하세요",
    type: "text",
  },
  {
    id: "reservation-phone",
    label: "연락처",
    name: "phone",
    placeholder: "전화번호를 입력하세요",
    type: "tel",
  },
  {
    id: "reservation-email",
    label: "이메일",
    name: "email",
    placeholder: "이메일을 입력하세요",
    type: "email",
  },
];

export default function ReservationInfoEdit() {
  return (
    <section className="reservation-info-edit" aria-labelledby="reservation-info-edit-title">
      <header className="reservation-info-edit__header">
        <h2 id="reservation-info-edit-title" className="ft-28b ink500">
          예약자 정보수정
        </h2>
        <p className="ft-16r ink300">예약자 정보를 수정하시면 예약에 반영됩니다.</p>
      </header>

      <form className="reservation-info-edit__form">
        <div className="reservation-info-edit__fields">
          {fields.map((field) => (
            <div className="reservation-info-edit__field" key={field.id}>
              <label className="reservation-info-edit__label ft-14b ink500" htmlFor={field.id}>
                {field.label}
                <FontAwesomeIcon className="reservation-info-edit__required" icon={faStarOfLife} />
              </label>
              <Input
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                state="default"
                type={field.type}
              />
            </div>
          ))}
        </div>

        <div className="reservation-info-edit__actions">
          <Button variant="cancel">취소하기</Button>
          <Button variant="payment" type="submit">
            저장하기
          </Button>
        </div>

        <p className="reservation-info-edit__notice">
          <FontAwesomeIcon className="reservation-info-edit__notice-icon ink500" icon={faStarOfLife} />
          <span className="ft-14r ink300">마이페이지 &gt; 회원정보에서도 수정할 수 있습니다.</span>
        </p>
      </form>
    </section>
  );
}
