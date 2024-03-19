import { Card, Container, Row, Col } from "react-bootstrap";
import { contentData } from "./HomeContent";


export function SectionContent() {
    return (  

        <Container>
           <h2 className="section-title homepageContent-title">Полезная информация</h2>
           <Row xs={1} md={3} lg={4} className="g-4">
           {contentData.map(item => (
                    <Col className="homepageContent-column" key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="homepageContent-card" border="secondary" style={{ width: "20rem", minHeight: "35rem"}}>
                            <a href={item.url}>
                                <Card.Img variant="top"
                                    src={item.imgSrc}
                                    alt={item.imgAlt}
                                    height={250}
                                    className="homepageContent-card-image"
                                />
                            </a>
                                    
                            <Card.Body className="homepageContent-card-body">
                                <a href={item.url}>
                                    <Card.Title className="homepageContent-card-body-title">
                                        <h3>{item.cardTitle}</h3>
                                    </Card.Title>
                                </a>
                                <Card.Text className="homepageContent-card-body-text">
                                    {item.cardText}
                                </Card.Text>
                            </Card.Body>
                            {
                                item.hasContacts ? 
                                    <Card.Footer className="homepageContent-card-footer">
                                        <span className="homepageContent-card-footer-item">{item.address}</span><br />
                                        <span className="homepageContent-card-footer-item">{item.phone}</span> <br />
                                        <span className="homepageContent-card-footer-item">{item.phone2}</span>
                                    </Card.Footer>: ""
                            }
                            
                        </Card>
                    </Col>    
                               
                ))}

           </Row>
        </Container>
          
    )
}
