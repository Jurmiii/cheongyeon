import { Footer } from "../../components/common";
import { LegalDocument } from "../../components/legal";
import { privacyPolicyDocument, termsOfServiceDocument } from "../../data/legal";
import "./LegalPage.scss";

interface LegalPageShellProps {
  children: React.ReactNode;
}

function LegalPageShell({ children }: LegalPageShellProps) {
  return (
    <main className="legal-page">
      <section className="legal-page__content">
        <div className="legal-page__inner">{children}</div>
      </section>
      <Footer />
    </main>
  );
}

export function TermsPage() {
  return (
    <LegalPageShell>
      <LegalDocument document={termsOfServiceDocument} variant="page" />
    </LegalPageShell>
  );
}

export function PrivacyPage() {
  return (
    <LegalPageShell>
      <LegalDocument document={privacyPolicyDocument} variant="page" />
    </LegalPageShell>
  );
}
