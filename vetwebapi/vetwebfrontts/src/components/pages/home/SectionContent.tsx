import { Card, Container, Row, Col } from "react-bootstrap";
import { contentData } from "./HomeContent";


export function SectionContent() {
    return (  

        <div className="container content-container">
            <h2 className="section-title home-content-title">Полезная информация</h2>
           <ul className="home-content-items list-reset flex">
           {contentData.map(item => (
                   
              <li className="home-content-item" key={item.id}>
                 <a href={item.url}>
                    <Card className="home-content-card" border="secondary">
                           
                                <Card.Img variant="top"
                                    src={item.imgSrc}
                                    alt={item.imgAlt}
                                    className="home-content-card-image"
                                />
                                    
                            <Card.Body className="home-content-card-body">
                                    <Card.Title className="home-content-card-body-title">
                                        <h3>{item.cardTitle}</h3>
                                    </Card.Title>
                                <Card.Text className="home-content-card-body-text">
                                    {item.cardText}
                                </Card.Text>
                            </Card.Body>
                            {
                                item.hasContacts ? 
                                    <Card.Footer className="home-content-card-footer">
                                        <span className="home-content-card-footer-item">{item.address}</span><br />
                                        <span className="home-content-card-footer-item">{item.phone}</span> <br />
                                        <span className="home-content-card-footer-item">{item.phone2}</span>
                                    </Card.Footer>: ""
                            }
                            
                        </Card>
                        </a>

              </li>
                        
                               
                ))}

           </ul>
        </div>
           
           

          
    )
}
