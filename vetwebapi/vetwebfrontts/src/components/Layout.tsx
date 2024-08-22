import { Outlet } from "react-router-dom";
import { Header } from "components/header/Header";
import { Footer } from "components/Footer";

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
