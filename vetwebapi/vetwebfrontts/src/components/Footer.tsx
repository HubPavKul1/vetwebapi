import { Container } from "react-bootstrap";
import { NavList } from "components/header/navList/NavList";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Container className="max-w-full p-8 border  border-t-black bg-gray-300">
        <Container className="flex justify-end bg-gray-300">
          <NavList />
        </Container>
      </Container>
    </footer>
  );
}
