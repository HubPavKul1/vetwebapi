import { Container } from "react-bootstrap";
import { Margin, usePDF } from "react-to-pdf";
import { ButtonCreate, CustomButton } from "shared/index";

interface PDFWrapperProps {
  closePdf: CallableFunction;
  children?: React.ReactElement | React.ReactNode;
  filename: string;
  orientation?: "p" | "l";
}

export function PDFWrapper({
  closePdf,
  filename,
  orientation = "p",
  children,
}: PDFWrapperProps) {
  const { toPDF, targetRef } = usePDF({
    method: "open",
    filename: `${filename}`,
    page: { margin: Margin.SMALL, orientation: `${orientation}` },
  });

  const onClick = () => {
    closePdf();
  };

  return (
    <Container className="px-0">
      <div className="flex py-3">
        <div className="w-auto mr-5">
          <ButtonCreate title="Открыть PDF" onClick={() => toPDF()} />
        </div>
        <div className="w-auto">
          <ButtonCreate title="Назад" onClick={onClick} />
        </div>
      </div>

      <Container className="py-3 px-0 overflow-auto" ref={targetRef}>
        {children}
      </Container>
    </Container>
  );
}
