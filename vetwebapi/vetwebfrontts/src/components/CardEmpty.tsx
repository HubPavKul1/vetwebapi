import { Button, Card, Col } from "react-bootstrap";

import farmImg from "/farm.jpg"



export function CardEmpty() {
    return (
        <Col md="3">
            <Card>
            <Card.Img variant="top"
                src={farmImg}
                alt="Farm"
            />

            <Card.Body>
                <Card.Title>
                    Название предприятия
                </Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati porro doloribus, nihil unde maxime, fugit distinctio fugiat inventore quos pariatur quibusdam suscipit facilis quia possimus, quo incidunt provident laudantium architecto?
                </Card.Text>
                <Button variant="primary">
                    Подробнее
                </Button>
            </Card.Body>
        </Card>
        </Col>
        
        )
    }