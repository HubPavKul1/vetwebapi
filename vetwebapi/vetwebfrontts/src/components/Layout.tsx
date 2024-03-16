import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./Footer";
import {BreadCrumbs} from "./BreadCrumbs";


export function Layout() {
    
    return (
        <>
        <header>
            <Header />
        </header>
        <BreadCrumbs />
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>      
        </>
    )
}