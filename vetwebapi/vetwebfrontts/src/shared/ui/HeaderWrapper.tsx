import React from "react";
import { Container } from "react-bootstrap";

interface HeaderWrapperProps {
  children: React.ReactNode | React.ReactElement;
}
export function HeaderWrapper({ children }: HeaderWrapperProps) {
  return (
    <>
      <header className="px-0 py-6 border-b bg-slate-300">
        <Container className="w-full flex items-center ">
          {children}
        </Container>
      </header>
    </>
  );
}
