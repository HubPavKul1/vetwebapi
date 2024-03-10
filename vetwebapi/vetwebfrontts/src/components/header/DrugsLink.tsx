import { Link } from "react-router-dom"
// import "../dropdown/Dropdown.css"
import { Dropdown } from "../dropdown/Dropdown"
import { useState } from "react"


export function DrugsLink() {
    const[active, setActive] = useState(false)

    return (
        <Dropdown active={active} setActive={setActive} title="Биопрепараты">
            <Link to="/drugs">Поступление</Link>
            <a>Препараты на складе</a>
            <a>Отчеты</a>
        </Dropdown>
        
  
    )
}