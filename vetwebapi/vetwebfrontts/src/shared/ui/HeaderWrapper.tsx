import React from "react";
import { Container } from "react-bootstrap";

interface HeaderWrapperProps {
  children: React.ReactNode | React.ReactElement;
}
export function HeaderWrapper({ children }: HeaderWrapperProps) {
  return (
    <>
      <header className="px-0 py-6 border-b bg-slate-100 bg-opacity-50">
        <Container className="w-[1180px] flex items-center ">
          {children}
        </Container>
      </header>
    </>
  );
}
