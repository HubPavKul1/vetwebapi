import React from "react";
import { Container } from "react-bootstrap";

interface PageDetailContentWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function PageDetailContentWrapper({
  title,
  children,
}: PageDetailContentWrapperProps) {
  return (
    <Container className="text-left mb-8 text-indigo-900">
      <h1 className="mb-2 text-center text-xl uppercase font-bold">{title}</h1>
      {children}
    </Container>
  );
}
