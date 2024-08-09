import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./footer";

export function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
