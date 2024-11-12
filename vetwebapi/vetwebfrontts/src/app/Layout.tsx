import { LoginPage } from "pages/LoginPage";
import { Outlet } from "react-router-dom";
import { Loader, useGetUser } from "shared/index";
import { Footer, Header } from "widgets/index";

export function Layout() {
  const { isLoading, isError } = useGetUser();

  if (isLoading) return <Loader />;
  if (isError) return <LoginPage />;
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
