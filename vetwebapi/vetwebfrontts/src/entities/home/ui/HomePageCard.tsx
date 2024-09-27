import { Card, Col, Container } from "react-bootstrap";
import { ICardProps } from "shared/model/CardProps";

interface HomePageCardProps {
  item: ICardProps;
}

export function HomePageCard({ item }: HomePageCardProps) {
  return (
    <Col>
      <a href={item.url}>
        <Card className="vertical-card">
          <Container className="w-full h-44">
            <Card.Img
              variant="top"
              src={item.imgSrc}
              alt={item.imgAlt}
              className="mb-8 w-full h-full"
            />
          </Container>

          <Card.Body>
            <Card.Title>
              <h5 className="title-base text-lg underline">{item.cardTitle}</h5>
            </Card.Title>
            <Card.Text className="text-base">{item.cardText}</Card.Text>
          </Card.Body>
          {item.hasContacts && (
            <Card.Footer className="flex flex-col text-xs">
              <span>{item.address}</span>
              <span>тел. {item.phone}</span>
              {item.phone2 && <span>тел. {item.phone2}</span>}
            </Card.Footer>
          )}
        </Card>
      </a>
    </Col>
  );
}
