import ClassCard from "./ClassCard/ClassCard";
import ContentCard from "./ContentCard/ContentCard";
import EventCard from "./EventCard/EventCard";
import ReservationCard from "./ReservationCard/ReservationCard";
import SeasonClassCard from "./SeasonClassCard";

export const cardAliases = {
  card1: "ClassCard",
  card2: "ContentCard",
  card3: "ReservationCard",
  card4: "EventCard",
  card5: "SeasonClassCard",
};

const cardComponents = {
  card1: ClassCard,
  card2: ContentCard,
  card3: ReservationCard,
  card4: EventCard,
  card5: SeasonClassCard,
};

export default function Card({ name, ...props }) {
  const Component = cardComponents[name];

  if (!Component) {
    return null;
  }

  return <Component {...props} />;
}
