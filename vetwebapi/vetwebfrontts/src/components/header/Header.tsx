import "./Header.css";
import "../dropdown/Dropdown.css"

import { useState } from "react";
import { HomeLink } from "./HomeLink";
import { CompaniesLink } from "./CompaniesLink";
import { DrugsLink } from "./DrugsLink";
import { Dropdown } from "../dropdown/Dropdown";


export function Header() {
    const [active, setActive] = useState(false)

    return (
            <nav className="colorlib-nav" role="navigation">
                <div className="top-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="top">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div id="colorlib-logo">
                                                <a href="">
                                                    <i className="flaticon-stethoscope" />
                                                    Vet<span>care</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrap">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-8">
                                    <div className="menu-1">
                                        <ul>
                                            <HomeLink />
                                            <CompaniesLink />
                                            {/* <DrugsLink />    */}
                                            <Dropdown active={active} setActive={setActive} title="Биопрепараты" /> 
                
                                            <li className="has-dropdown">
                                                <a href="blog.html">Blog</a>
                                                <ul className="dropdown">
                                                    <li>
                                                        <a href="blog-single.html">Single Blog</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="">Админка</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <p className="btn-cta">
                                        <a href="">
                                            <span>
                                                Выйти
                                            </span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

    )
}