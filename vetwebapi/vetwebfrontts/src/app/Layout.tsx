import { LoginPage } from "pages/LoginPage";
import { Outlet } from "react-router-dom";
import { Loader, useGetData } from "shared/index";
import { userUrl } from "shared/urls/userUrls";
import { Footer, Header } from "widgets/index";

export function Layout() {
  const { isLoading, isError } = useGetData("getUser", userUrl);
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
