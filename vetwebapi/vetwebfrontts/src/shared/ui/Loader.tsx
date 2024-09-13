import { Container, Row } from "react-bootstrap";
import { ImSpinner } from "react-icons/im";

export function Loader() {
  return (
    <Container className="pt-28 text-center text-xl text-indigo-600">
      <Row>
        <ImSpinner className="mb-5 text-7xl text-indigo-600 animate-spin-slow"/>
        <h4>Загрузка...</h4>
      </Row>
    </Container>
  )
  
}

