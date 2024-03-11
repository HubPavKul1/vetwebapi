import { Link } from "react-router-dom"
import { Dropdown } from "../dropdown/Dropdown"
import { useState } from "react"


export function DrugsLink() {
    const[active, setActive] = useState(false)

    return (
        <Dropdown active={active} setActive={setActive} title="Биопрепараты">
            <li><Link to="/drugs">Поступление</Link></li>
            <li><a href="#">Препараты на складе</a></li>
            <li><a href="#">Отчеты</a></li>
        </Dropdown>
        
  
    )
}