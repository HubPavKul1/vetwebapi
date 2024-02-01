import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./header/Header";
import Modal from "./modal/Modal";


export default function Layout() {
    const [modalActive, setModalActive] = useState(true)
    return (
        <>
            <Header />
            <Outlet />
            <button onClick={() => setModalActive(true)}>Modal window</button>
            <Modal active={modalActive} setActive={setModalActive}/>
            
        </>
    )
}