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
          <Container className="w-full h-40 mb-1">
            <Card.Img
              variant="top"
              src={item.imgSrc}
              alt={item.imgAlt}
              className="w-full h-full"
            />
          </Container>
          <Card.Body>
            <Card.Title className="h-8">
              <h5 className="text-center text-[16px] underline">
                {item.cardTitle}
              </h5>
            </Card.Title>
            <Card.Text className="text-left text-xs">{item.cardText}</Card.Text>
          </Card.Body>
          {item.hasContacts && (
            <Card.Footer className="flex flex-col text-sm">
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
