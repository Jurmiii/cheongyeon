import { Container, Section } from "../components/common";
import {
  ClassCard,
  ContentCard,
  EventCard,
  ReservationCard,
} from "../components/cards";
import { classes } from "../data/classes";
import { contents } from "../data/contents";
import { events } from "../data/events";
import { reservations } from "../data/reservations";
import "./CardDemo.scss";

export default function CardDemo() {
  return (
    <Section>
      <Container>
        <div className="card-demo">
          <div className="card-demo__grid card-demo__grid--classes">
            {classes.map((item) => (
              <ClassCard key={item.id} {...item} />
            ))}
          </div>
          <div className="card-demo__grid card-demo__grid--contents">
            {contents.map((item) => (
              <ContentCard key={item.id} {...item} />
            ))}
          </div>
          <div className="card-demo__grid card-demo__grid--reservations">
            {reservations.map((item) => (
              <ReservationCard key={item.id} {...item} />
            ))}
          </div>
          <div className="card-demo__grid card-demo__grid--events">
            {events.map((item) => (
              <EventCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
