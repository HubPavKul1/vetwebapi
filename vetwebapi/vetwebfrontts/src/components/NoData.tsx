import { Container } from "react-bootstrap";
import { PiSmileySadBold } from "react-icons/pi";

interface NoDataProps {
  title: string;
}

export default function NoData({ title }: NoDataProps) {

  const firstWord = title.toUpperCase()
  const letters = ["и", "ы", "я"]
  const lastLetter = firstWord.slice(-1).toLowerCase()

  // console.log("БУКВА", lastLetter)
  // console.log(letters.i)

  return (
      <Container className="p-10 text-center border-2 w-auto drop-shadow-md shadow-md shadow-red-900">
        <h1 className="text-3xl text-red-600 ">
          {firstWord} {letters.includes(lastLetter) ? "ОТСУТСТВУЮТ!!!": "ОТСУТСТВУЕТ!!!"}
        </h1>
        <Container className="flex justify-center">
          <PiSmileySadBold fontSize={80} color="red" />
        </Container>
      </Container>

  );
}
