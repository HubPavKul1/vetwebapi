import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export function CardEmpty() {
    return (
            <Card className="company-card">
                <Link to={`/`} >
                    <Card.Img className="company-card-image"
                    variant="top"
                    src="/farm.jpg"
                    alt="Farm"
                />
                </Link>
            

            <Card.Body>
                <Card.Title className="company-card-title">
                    <Link to={`/`} >
                        Название предприятия
                    </Link>
                   
                </Card.Title>
                <Card.Text className="company-card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati porro doloribus, nihil unde maxime, fugit distinctio fugiat inventore quos pariatu
                </Card.Text>
            </Card.Body>
        </Card>
        
        )
    }