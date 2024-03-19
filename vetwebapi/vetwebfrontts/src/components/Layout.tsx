import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./Footer";



export function Layout() {
    
    return (
        <>
        <header className="header">
            <Header />
        </header>
        <main className="main">
            <Outlet />
        </main>
        <footer className="footer">
            <Footer />
        </footer>      
        </>
    )
}