import { Footer } from "../../components/common";
import Signup from "./Signup";
import "./SignupPage.scss";

function SignupPage() {
  return (
    <main className="signup-page-wrapper">
      <Signup />
      <Footer />
    </main>
  );
}

export default SignupPage;
