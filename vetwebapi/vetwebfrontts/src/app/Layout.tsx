import { useCookies } from "react-cookie";
import { LoginPage } from "pages/LoginPage";
import { Outlet } from "react-router-dom";
import { Loader, useGetAllData } from "shared/index";
import { userUrl } from "shared/urls/userUrls";
import { Footer, Header } from "widgets/index";

export function Layout() {
  const [cookies] = useCookies(["vetwebapi"]);
  console.log("Vetwebapi", cookies);
  const { data, isLoading, isError } = useGetAllData("getUser", userUrl);

  if (isLoading) return <Loader />;
  if (isError) return <LoginPage />;
  if (data) console.log("DATA", data);
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
