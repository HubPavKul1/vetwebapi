import { Container } from "react-bootstrap";
import { PiSmileySadBold } from "react-icons/pi";

interface NoDataProps {
  title: string;
}

export function NoData({ title }: NoDataProps) {
  const firstWord = title.toUpperCase();
  const letters = ["и", "ы", "я", "е"];
  const lastLetter = firstWord.slice(-1).toLowerCase();

  return (
    <Container className="p-10 text-center border-2 w-auto shadow-md shadow-red-900">
      <h1 className="text-3xl text-red-600 ">
        {firstWord}{" "}
        {letters.includes(lastLetter) ? "ОТСУТСТВУЮТ!!!" : "ОТСУТСТВУЕТ!!!"}
      </h1>
      <Container className="flex justify-center">
        <PiSmileySadBold fontSize={80} color="red" />
      </Container>
    </Container>
  );
}
