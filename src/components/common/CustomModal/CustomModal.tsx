import { useEffect, useRef, useState, type ReactNode, type TransitionEvent } from "react";
import { createPortal } from "react-dom";

import { useLockBodyScroll } from "../../../hooks/useLockBodyScroll";
import "./CustomModal.scss";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function CustomModal({ children, isOpen, onClose }: CustomModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isRendered && isOpen, modalRef);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }

    setIsRendered(true);
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen]);

  useEffect(() => {
    if (!isRendered || !isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isRendered, onClose]);

  if (!isRendered) {
    return null;
  }

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !isVisible) {
      setIsRendered(false);
    }
  };

  return createPortal(
    <div
      ref={modalRef}
      className={["CustomModal", isVisible && "CustomModal--open"].filter(Boolean).join(" ")}
      role="presentation"
      onClick={onClose}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        aria-modal="true"
        className="CustomModal-content"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="CustomModal-close" type="button" aria-label="커스텀 모달 닫기" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>
        <div className="CustomModal-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
