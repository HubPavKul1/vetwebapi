import { Container } from "react-bootstrap";


interface PageWrapperProps {
    children: React.ReactNode;
}

export function PageWrapper({children}: PageWrapperProps) {
  return (
    <Container className="h-full py-4 ">{children}</Container>
  )
}
