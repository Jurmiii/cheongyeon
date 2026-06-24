import ClassCard from "./ClassCard/ClassCard";
import ContentCard from "./ContentCard/ContentCard";
import EventCard from "./EventCard/EventCard";
import Card6 from "./Card6/Card6";
import ReservationCard from "./ReservationCard/ReservationCard";
import SeasonClassCard from "./SeasonClassCard";

export const cardAliases = {
  card1: "ClassCard",
  card2: "ContentCard",
  card3: "ReservationCard",
  card4: "EventCard",
  card5: "SeasonClassCard",
  card6: "Card6",
};

const cardComponents = {
  card1: ClassCard,
  card2: ContentCard,
  card3: ReservationCard,
  card4: EventCard,
  card5: SeasonClassCard,
  card6: Card6,
};

export default function Card({ name, ...props }) {
  const Component = cardComponents[name];

  if (!Component) {
    return null;
  }

  return <Component {...props} />;
}
