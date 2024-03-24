import { Container } from "react-bootstrap"
import { HomeLink } from "./header/HomeLink";
import { CompaniesLink } from "./header/CompaniesLink";
import { DrugsLink } from "./header/DrugsLink";

import { VetWorkLink } from "./header/VetWorkLink";
import { AdminLink } from "./header/AdminLink";




export function Footer() {
    
    return (
        <Container className="footer-wrap">
             <Container className="footer-container flex">
               <nav className="header-nav">
                            <ul className="header-list list-reset flex"> 
                                <HomeLink />
                                <CompaniesLink />
                                <DrugsLink />  
                                <VetWorkLink />
                                <AdminLink/>
                            </ul>
                        </nav>
         
            </Container>
        </Container>
    
           

       
    )
}