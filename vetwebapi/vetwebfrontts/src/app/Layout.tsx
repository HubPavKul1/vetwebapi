import { Outlet } from "react-router-dom";
import { Footer, Header } from "widgets/index";

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
