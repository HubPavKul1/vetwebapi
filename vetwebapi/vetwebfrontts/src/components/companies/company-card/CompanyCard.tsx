
import { Link } from "react-router-dom"
import { ICompany } from "../../../interfaces/CompanyInterfaces"
import { Card } from "react-bootstrap";
import farmImg from "/farm.jpg"


interface CompanyCard {
    company: ICompany;
}

export function CompanyCard({company}: CompanyCard) {
    return (
        <Card>
            <Card.Img variant="top"
                src={farmImg}
                alt="Farm"
            />
        
            <Card.Body>
                <Card.Title>
                    <Link to={`/companies/${company.id}`} >{company.full_name}</Link>
                </Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati porro doloribus, nihil unde maxime, fugit distinctio fugiat inventore quos pariatur quibusdam suscipit facilis
                </Card.Text>
            </Card.Body> 
            <Card.Footer>

            </Card.Footer>   
        </Card>
        
    )
}