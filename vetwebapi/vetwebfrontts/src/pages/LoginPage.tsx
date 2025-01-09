import { LoginForm } from "features/user/LoginForm";
import { Col, Container, Row } from "react-bootstrap";
import { PageWrapper } from "shared/index";

export function LoginPage() {
  return (
    <PageWrapper>
      <Row sm={1} md={2}>
        <Col className="mb-5">
          <div>
            <img
              src="/animals.jpg"
              alt="animals"
              className="w-auto h-auto m-auto"
            />
          </div>
        </Col>
        <Col>
          <Container className="w-full">
            <Container className="w-72">
              <h1 className="page-title">Вход в систему</h1>
              <LoginForm />
            </Container>
          </Container>
        </Col>
      </Row>
    </PageWrapper>
  );
}
