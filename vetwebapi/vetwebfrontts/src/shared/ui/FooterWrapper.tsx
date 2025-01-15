import React from "react";
import { Container } from "react-bootstrap";

interface FooterWrapperProps {
  children: React.ReactNode | React.ReactElement;
}

export function FooterWrapper({ children }: FooterWrapperProps) {
  return (
    <footer className="mt-auto p-6 bg-gray-400 border bg-opacity-50">
      <Container className="w-[1180px] flex items-center">{children}</Container>
    </footer>
  );
}
