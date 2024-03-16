import { Card, Container, Row, Col } from "react-bootstrap";
import { contentData } from "./HomeContent";


export function SectionContent() {
    return (  

        <Container>
           <h2 className="text-center m-4">Полезная информация</h2>
           <Row xs={2} md={3} className="g-4">
           {contentData.map(item => (
                    <Col key={item.id} md={4} sm={1}>
                        <Card border="secondary" style={{height: "30rem"}}>
                            <a href={item.url}>
                                <Card.Img variant="top"
                                    src={item.imgSrc}
                                    alt={item.imgAlt}
                                    height={250}
                                />
                            </a>
                                    
                            <Card.Body>
                                <a href={item.url}>
                                    <Card.Title className="text-center">
                                        {item.cardTitle}
                                    </Card.Title>
                                </a>
                                <Card.Text>
                                    {item.cardText}
                                </Card.Text>
                            </Card.Body>
                            
                            <Card.Footer>
                                <span>{item.phone}</span>
                                <span> {item.phone2}</span>
                            </Card.Footer>
                        </Card>
                    </Col>    
                               
                ))}

           </Row>
        </Container>
          
    )
}
