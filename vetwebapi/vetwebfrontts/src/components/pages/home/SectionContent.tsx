import { Card, Container, Row, Col } from "react-bootstrap";
import { contentData } from "./HomeContent";


export function SectionContent() {
    return (  

        <Container fluid>
           <h2 className="text-center m-4">Полезная информация</h2>
           <Row xs={1} md={3} lg={4} className="g-4">
           {contentData.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Card border="secondary" style={{ width: "20rem", height: "35rem"}}>
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
                            {
                                item.hasContacts ? 
                                    <Card.Footer>
                                        <span>{item.address}</span><br />
                                        <span>{item.phone}</span> <br />
                                        <span> {item.phone2}</span>
                                    </Card.Footer>: ""
                            }
                            
                        </Card>
                    </Col>    
                               
                ))}

           </Row>
        </Container>
          
    )
}
