import "./Header.css";

import HomeLink from "./HomeLink";
import CompaniesLink from "./CompaniesLink";


export default function Header() {
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
                                           
                                
                                            <li className="has-dropdown">
                                                <a href="#">Биопрепараты</a>
                                                <ul className="dropdown">
                                                    <li>
                                                        <a href="#">Поступление</a>
                                                    </li>
                                                    <li>
                                                        <a href="departments-single.html">Dental Department</a>
                                                    </li>
                                                    <li>
                                                        <a href="departments-single.html">
                                                            Psychological Department
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
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