import React from "react";
import { Container } from "react-bootstrap";

interface FooterWrapperProps {
  children: React.ReactNode | React.ReactElement;
}

export function FooterWrapper({ children }: FooterWrapperProps) {
  return (
    <footer className="mt-auto  bg-gray-300">
      <Container className="w-[1180px] p-8 border  border-t-black">
        <Container className="flex justify-end bg-gray-300">
          {children}
        </Container>
      </Container>
    </footer>
  );
}
