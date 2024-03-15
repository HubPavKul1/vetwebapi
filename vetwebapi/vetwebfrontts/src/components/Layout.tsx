import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./Footer";


export function Layout() {
    
    return (
        <>
        <header>
            <Header />
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>      
        </>
    )
}