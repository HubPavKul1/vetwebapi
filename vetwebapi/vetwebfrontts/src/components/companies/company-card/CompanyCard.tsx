
import { Link } from "react-router-dom"
import { ICompany } from "../../../interfaces/CompanyInterfaces"
import { Button, Card } from "react-bootstrap";



interface CompanyCard {
    company: ICompany;
}

export function CompanyCard({company}: CompanyCard) {
    return (
        <Card>
            <Card.Img variant="top"/>
            <Card.Body>
                <Card.Title>
                    <Link to={`/companies/${company.id}`} >{company.full_name}</Link>
                </Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati porro doloribus, nihil unde maxime, fugit distinctio fugiat inventore quos pariatur quibusdam suscipit facilis quia possimus, quo incidunt provident laudantium architecto?
                </Card.Text>
                <Button variant="primary">

                </Button>
            </Card.Body>
            
        </Card>

        // <div className="col-md-4 animate-box">
        //                 <div className="services">
        //                     <span className="icon">
        //                         <i className="flaticon-healthy-1" />
        //                     </span>
        //                     <div className="desc">
        //                         <h3>
        //                             <Link to={`/companies/${company.id}`} >{company.full_name}</Link>
        //                         </h3>
        //                         <p>
        //                             The Big Oxmox advised her not to do so, because there were
        //                             thousands of bad Commas
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
    )
}