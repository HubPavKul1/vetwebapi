import { LoginForm } from "features/user/LoginForm";
import { Col, Container, Row } from "react-bootstrap";
import { PageWrapper } from "shared/index";

export function LoginPage() {
  return (
    <PageWrapper>
      <Row sm={1} md={2} className="mb-20"></Row>
      <Row sm={1} md={2} className="">
        <Col className="mb-5">
          <div>
            <img
              src="logo.png"
              alt="animals"
              className="w-full h-auto m-auto"
            />
          </div>
        </Col>
        <Col>
          <Container className="w-80 pt-4">
            <h1 className="page-title">Вход в систему</h1>
            <LoginForm />
          </Container>
        </Col>
      </Row>
    </PageWrapper>
  );
}
