import { Footer } from "../../components/common";
import PageMeta from "../../components/seo/PageMeta";
import { PAGE_SEO } from "../../data/pageSeoMeta";
import Signup from "./Signup";
import "./SignupPage.scss";

function SignupPage() {
  return (
    <main className="signup-page-wrapper">
      <PageMeta {...PAGE_SEO.signup} />
      <Signup />
      <Footer />
    </main>
  );
}

export default SignupPage;
