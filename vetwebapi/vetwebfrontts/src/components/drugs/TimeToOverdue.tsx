import { Container } from "react-bootstrap";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { timeToExpiration } from "services/app.service";

interface TimeToOverdueProps {
  expirationDate: Date;
}

export function TimeToOverdue({ expirationDate }: TimeToOverdueProps) {
  const timeToExp =
    "Срок годности истечет " + timeToExpiration(expirationDate).result;

  

  return <Container className="flex text-center justify-between border-2 border-red-700 p-1 text-red-700 font-bold">
  <RiCalendarScheduleLine size={30} />
  <span>{timeToExp}</span>
</Container>
}
