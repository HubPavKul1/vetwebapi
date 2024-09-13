import { Outlet } from "react-router-dom";
import { Header } from "widgets/header/Header";
import { Footer } from "widgets/Footer";

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
