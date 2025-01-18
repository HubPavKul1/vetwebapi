import { Card, Col, Container } from "react-bootstrap";
import { ICardProps } from "shared/model/CardProps";

interface HomePageCardProps {
  item: ICardProps;
}

export function HomePageCard({ item }: HomePageCardProps) {
  return (
    <Col>
      <Container className="mb-5 h-96">
        <a href={item.url}>
          <Card className="flex bg-slate-200 flex-col p-3 mb-5 h-full w-full drop-shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
            <Container className="flex h-40 mb-1 justify-center items-center">
              <Card.Img
                variant="top"
                src={item.imgSrc}
                alt={item.imgAlt}
                className="h-full w-auto"
              />
            </Container>
            <Card.Body>
              <Card.Title className="h-8">
                <h5 className="text-center text-[16px] underline">
                  {item.cardTitle}
                </h5>
              </Card.Title>
              <Card.Text className="text-left text-xs">
                {item.cardText}
              </Card.Text>
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
      </Container>
    </Col>
  );
}
