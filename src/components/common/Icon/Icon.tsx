import { faStamp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SVGProps } from "react";

export type IconName =
  | "angle-down"
  | "angle-top"
  | "arrow-right"
  | "calendar"
  | "chevron-left"
  | "chevron-right"
  | "clock"
  | "credit-card"
  | "circle-info"
  | "envelope"
  | "eye"
  | "eye-slash"
  | "gift"
  | "image"
  | "location-dot"
  | "lock"
  | "magnifying-glass"
  | "mobile"
  | "mug"
  | "clipboard"
  | "star-of-life"
  | "stamp"
  | "user"
  | "won-circle";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export default function Icon({ name, className = "", ...props }: IconProps) {
  const classes = ["cy-icon", className].filter(Boolean).join(" ");
  const isHidden = props["aria-label"] ? undefined : true;

  if (name === "stamp") {
    return (
      <FontAwesomeIcon
        aria-hidden={isHidden}
        aria-label={props["aria-label"]}
        className={classes}
        icon={faStamp}
      />
    );
  }

  return (
    <svg
      className={classes}
      viewBox="0 0 24 24"
      aria-hidden={isHidden}
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      {name === "angle-down" && <path d="m7 10 5 5 5-5" />}
      {name === "angle-top" && <path d="m6 15 6-6 6 6" />}
      {name === "arrow-right" && (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
      {name === "calendar" && (
        <>
          <path d="M7 3v4" />
          <path d="M17 3v4" />
          <rect width="16" height="17" x="4" y="5" rx="2" />
          <path d="M4 10h16" />
        </>
      )}
      {name === "chevron-left" && <path d="m15 18-6-6 6-6" />}
      {name === "chevron-right" && <path d="m9 6 6 6-6 6" />}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v5l3 2" />
        </>
      )}
      {name === "credit-card" && (
        <>
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 15h3" />
        </>
      )}
      {name === "circle-info" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5" />
          <path d="M12 8h.01" />
        </>
      )}
      {name === "envelope" && (
        <>
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
      {name === "eye" && (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
      {name === "eye-slash" && (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4" />
          <path d="M9.9 4.4A9.7 9.7 0 0 1 12 4c5 0 8.5 4.5 9.5 8a12 12 0 0 1-2.1 3.7" />
          <path d="M6.6 6.6A12 12 0 0 0 2.5 12c1 3.5 4.5 8 9.5 8 1.5 0 2.9-.4 4.1-1" />
        </>
      )}
      {name === "gift" && (
        <>
          <path d="M20 12v8H4v-8" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 7v13" />
          <path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5L12 7Z" />
          <path d="M12 7h3.5A2.5 2.5 0 1 0 13 4.5L12 7Z" />
        </>
      )}
      {name === "image" && (
        <>
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <circle cx="8" cy="10" r="1.5" />
          <path d="m21 16-4.5-4.5L8 20" />
        </>
      )}
      {name === "location-dot" && (
        <>
          <path d="M19 10c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2" />
        </>
      )}
      {name === "lock" && (
        <>
          <rect width="16" height="11" x="4" y="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
      )}
      {name === "magnifying-glass" && (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </>
      )}
      {name === "mobile" && (
        <>
          <rect width="10" height="18" x="7" y="3" rx="2" />
          <path d="M11 18h2" />
        </>
      )}
      {name === "mug" && (
        <>
          <path d="M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" />
          <path d="M16 10h2a3 3 0 0 1 0 6h-2" />
          <path d="M8 4v2" />
          <path d="M12 4v2" />
        </>
      )}
      {name === "clipboard" && (
        <>
          <rect width="14" height="17" x="5" y="4" rx="2" />
          <path d="M9 4a3 3 0 0 1 6 0" />
          <path d="M9 8h6" />
          <path d="M8.5 13h7" />
          <path d="M8.5 17h5" />
        </>
      )}
      {name === "star-of-life" && (
        <>
          <path d="M12 4v16" />
          <path d="M4 12h16" />
          <path d="m6.3 6.3 11.4 11.4" />
          <path d="m17.7 6.3-11.4 11.4" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.2-4 12.8-4 14 0" />
        </>
      )}
      {name === "won-circle" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m7.5 8.5 2.25 7 2.25-7 2.25 7 2.25-7" />
          <path d="M7 11.5h10" />
          <path d="M7 14h10" />
        </>
      )}
    </svg>
  );
}
