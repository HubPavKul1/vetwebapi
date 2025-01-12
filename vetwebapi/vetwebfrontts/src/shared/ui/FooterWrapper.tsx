import React from "react";
import { Container } from "react-bootstrap";

interface FooterWrapperProps {
  children: React.ReactNode | React.ReactElement;
}

export function FooterWrapper({ children }: FooterWrapperProps) {
  return (
    <footer className="mt-auto p-8 bg-gray-400 border bg-opacity-50">
        <Container className="flex items-center justify-end">
          {children}
        </Container>
    </footer>
  );
}
