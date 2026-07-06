import { useEffect } from "react";

import type { LegalDocument as LegalDocumentType } from "../../data/legal";
import { useModalOpen } from "../../hooks/useLockBodyScroll";
import LegalDocument from "./LegalDocument";
import "./LegalDocumentModal.scss";

interface LegalDocumentModalProps {
  document: LegalDocumentType;
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalDocumentModal({ document, isOpen, onClose }: LegalDocumentModalProps) {
  useModalOpen(isOpen);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="legal-document-modal" role="presentation" onClick={onClose}>
      <div
        className="legal-document-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={document.title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="legal-document-modal__toolbar">
          <h2 className="legal-document-modal__toolbar-title ft-22b ink500">{document.title}</h2>
          <button className="legal-document-modal__close ft-16b ink500" type="button" onClick={onClose}>
            닫기
          </button>
        </header>

        <div className="legal-document-modal__scroll">
          <LegalDocument document={document} variant="modal" />
        </div>
      </div>
    </div>
  );
}
