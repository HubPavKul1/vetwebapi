import { Link } from "react-router-dom"


export default function CompaniesLink() {
    return (
        <li>
            {/* <a href="/companies/">Предприятия</a> */}
            <Link to="/companies/">Предприятия</Link>
        </li>
    )
}