import { Breadcrumb, Container } from "react-bootstrap"
import { useLocation, Link } from "react-router-dom"

export function BreadCrumbs() {
    const location = useLocation()

    let currentLink = ""
    console.log("currentLink>>>", currentLink)

    const crumbs = location.pathname.split("/")
    .filter(crumb => crumb !== "")

    console.log("crumb>>>", crumbs)

    crumbs.map(crumb => {
        currentLink += `/${crumb}`
    
     return (
        <div key={crumb} className="breadcrumb">
            <Link to={currentLink}>{crumb}</Link>
        </div> )  
})
// return (
//     <Breadcrumb>
//         <h2 style={{color: "black"}}>Bread</h2>
//     </Breadcrumb>
// )
}


