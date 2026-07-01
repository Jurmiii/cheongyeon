import { Footer, Header } from "../../components/common";
import Signup from "./Signup";
import "./SignupPage.scss";

function SignupPage() {
  return (
    <main className="signup-page-wrapper">
      <div className="signup-page-wrapper__header">
        <Header />
      </div>
      <Signup />
      <Footer />
    </main>
  );
}

export default SignupPage;
