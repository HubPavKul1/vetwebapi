import { Container } from "react-bootstrap";
import { PiSmileySadBold } from "react-icons/pi";

interface NoDataProps {
  title: string;
}

export default function NoData({ title }: NoDataProps) {
  return (
      <Container className="p-10 text-center border-2 w-auto drop-shadow-md shadow-md shadow-red-900">
        <h1 className="text-3xl text-red-600 ">
          {title.toUpperCase()} ОТСУТСТВУЮТ!!!
        </h1>
        <Container className="flex justify-center">
          <PiSmileySadBold fontSize={80} color="red" />
        </Container>
      </Container>

  );
}
