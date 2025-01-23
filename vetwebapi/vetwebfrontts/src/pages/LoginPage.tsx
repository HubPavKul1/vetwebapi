import { LoginForm } from "features/user/LoginForm";
import { Col, Container, Row } from "react-bootstrap";
import { SectionWrapper } from "shared/index";

export function LoginPage() {
  return (
    <SectionWrapper>
      <Row sm={1} md={2} className="mb-32"></Row>
      <Row sm={1} md={2}>
        <Col className="mb-5">
          <div>
            <img src="/logo.png" alt="logo" className="w-full h-auto m-auto" />
          </div>
        </Col>
        <Col>
          <Container className="w-80 pt-7">
            <h1 className="page-title">Вход в систему</h1>
            <LoginForm />
          </Container>
        </Col>
      </Row>
    </SectionWrapper>
  );
}
