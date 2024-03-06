import { Link } from "react-router-dom"


export function DrugsLink() {
    return (
        <li className="has-dropdown">
            <Link to="/drugs/">Биопрепараты</Link>
            <ul className="dropdown">
                <li>
                    <a href="#">Поступление</a>
                </li>
                <li>
                    <a href="departments-single.html">Dental Department</a>
                </li>                                      
            </ul>
        </li>          
  
    )
}