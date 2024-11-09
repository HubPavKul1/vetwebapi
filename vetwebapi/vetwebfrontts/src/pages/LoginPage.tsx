import { LoginForm } from "features/user/LoginForm";
import { Col, Container, Row } from "react-bootstrap";
import { PageWrapper } from "shared/index";

export function LoginPage() {
  return (
    <PageWrapper>
      <Row>
        <Col>
          <div>
            <img
              src="/animals.jpg"
              alt="animals"
              className="w-auto h-auto m-auto"
            />
          </div>
        </Col>
        <Col>
          <Container>
            <h1 className="page-title">Вход в систему</h1>
            <Container className="w-60">
              <LoginForm />
            </Container>
          </Container>
        </Col>
      </Row>
    </PageWrapper>
  );
}
