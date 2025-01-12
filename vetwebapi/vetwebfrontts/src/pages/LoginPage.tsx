import { LoginForm } from "features/user/LoginForm";
import { Col, Container, Row } from "react-bootstrap";
import { PageWrapper } from "shared/index";

export function LoginPage() {
  return (
    <PageWrapper>
      <Row sm={1} md={2} className="mb-40"></Row>
      <Row sm={1} md={2} className="items-center">
        <Col className="mb-5">
          <div>
            <img
              src="/animalsForSlider2.png"
              alt="animals"
              className="w-full h-auto m-auto"
            />
          </div>
        </Col>
        <Col>
          <Container className="w-full">
            <Container className="w-72 ">
              <h1 className="page-title">Вход в систему</h1>
              <LoginForm />
            </Container>
          </Container>
        </Col>
      </Row>
    </PageWrapper>
  );
}
