import { Button, Card } from "react-bootstrap";





export function CardEmpty() {
    return (
        <Card>
            <Card.Img variant="top"/>
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
        )
    }