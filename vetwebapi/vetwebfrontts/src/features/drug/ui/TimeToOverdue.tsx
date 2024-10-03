import { Container } from "react-bootstrap";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { timeToExpiration } from "shared/helpers";

interface TimeToOverdueProps {
  expirationDate: Date;
}

export function TimeToOverdue({ expirationDate }: TimeToOverdueProps) {
  const timeToExp =
    "Срок годности истечет " + timeToExpiration(expirationDate).result;

  return (
    <Container className="w-[340px] flex p-1 justify-center gap-1 border-2 rounded-md bg-white bg-opacity-50 border-red-700 text-center text-xs text-red-700 font-bold">
      <RiCalendarScheduleLine size={16} />
      <span>{timeToExp}</span>
    </Container>
  );
}
