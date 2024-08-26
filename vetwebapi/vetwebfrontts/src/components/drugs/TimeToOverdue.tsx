import { Container } from "react-bootstrap";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { timeToExpiration } from "services/app.service";

interface TimeToOverdueProps {
  expirationDate: Date;
}

export function TimeToOverdue({ expirationDate }: TimeToOverdueProps) {
  const timeToExp =
    "Срок годности истечет " + timeToExpiration(expirationDate).result;

  return (
    <Container className="absolute top-20 left-5 w-[340px] flex p-1 justify-between border-2 rounded-md bg-white bg-opacity-50 border-red-700 text-center text-red-700 font-bold">
      <RiCalendarScheduleLine size={30} />
      <span>{timeToExp}</span>
    </Container>
  );
}