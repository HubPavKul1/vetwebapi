
import { Link } from "react-router-dom"
import { ICompany } from "../../../interfaces/CompanyInterfaces"
import { Card } from "react-bootstrap";
import farmImg from "/farm.jpg"


interface CompanyCard {
    company: ICompany;
}

export function CompanyCard({company}: CompanyCard) {
    return (
        <Link to={`/companies/${company.id}`} >
        <Card className="company-card"> 
            
                <Card.Img className="company-card-image"
                        variant="top"
                        src={farmImg}
                        alt="Farm"
                    />
            
           
            <Card.Body>
                <Card.Title className="company-card-title">
                    {company.full_name}
                </Card.Title>
                <Card.Text className="company-card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati porro doloribus, nihil unde maxime, fugit distinctio fugiat inventore quos pariatur quibusdam suscipit facilis
                </Card.Text>
            </Card.Body> 
            <Card.Footer>

            </Card.Footer>   
        </Card>
        </Link>
        
    )
}