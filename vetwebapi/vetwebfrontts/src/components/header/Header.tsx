
import vetLogo from "./vetLogo.png"
import { useState } from "react";
import { HomeLink } from "./HomeLink";
import { CompaniesLink } from "./CompaniesLink";
import { DrugsLink } from "./DrugsLink";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


export function Header() {
    const [active, setActive] = useState(false)

    return (
                <Navbar>
                    <Container>
                        <Navbar.Brand>
                            <Link to="/" >
                                <img src={vetLogo}
                                    height="30"
                                    width="30"
                                    className="d-inline-block align-top"
                                    alt="Logo"
                                />
                            </Link>
                        </Navbar.Brand>
                    </Container>
                </Navbar>


            // <nav className="colorlib-nav" role="navigation">
            //     <div className="top-menu">
            //         <div className="container">
            //             <div className="row">
            //                 <div className="col-xs-12">
            //                     <div className="top">
            //                         <div className="row">
            //                             <div className="col-md-6">
            //                                 <div id="colorlib-logo">
            //                                     <a href="">
            //                                         <i className="flaticon-stethoscope" />
            //                                         Vet<span>care</span>
            //                                     </a>
            //                                 </div>
            //                             </div>
            //                             <div className="col-md-3"></div>
            //                             <div className="col-md-3"></div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div className="menu-wrap">
            //             <div className="container">
            //                 <div className="row">
            //                     <div className="col-xs-8">
            //                         <div className="menu-1">
            //                             <ul>
            //                                 <HomeLink />
            //                                 <CompaniesLink />
            //                                 <DrugsLink />  
            //                                 <li><a href="#">Админка</a></li>
                
            //                             </ul>
            //                         </div>
            //                     </div>
            //                     <div className="col-md-4">
            //                         <p className="btn-cta">
            //                             <a href="">
            //                                 <span>
            //                                     Выйти
            //                                 </span>
            //                             </a>
            //                         </p>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </nav>

    )
}