import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header/Header";

export default function SiteChromeLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="site-chrome__header">
        <Header />
      </div>
      <Outlet key={pathname} />
    </>
  );
}
