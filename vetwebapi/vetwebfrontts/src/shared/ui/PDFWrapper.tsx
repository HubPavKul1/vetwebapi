import { Container } from "react-bootstrap";
import { Margin, usePDF } from "react-to-pdf";
import { CustomButton } from "shared/index";



interface PDFWrapperProps {
  setPdf: CallableFunction;
  children?: React.ReactElement | React.ReactNode;
  filename: string;
  orientation?: "p" | "l";
}

export function PDFWrapper({
  setPdf,
  filename,
  orientation = "p",
  children,
}: PDFWrapperProps) {
  const { toPDF, targetRef } = usePDF({
    method: "open",
    filename: `${filename}`,
    page: {margin: Margin.SMALL, orientation: `${orientation}` },
  });

  const onClick = () => {
    setPdf(false);
  };

  return (
    <Container>
      <div className="flex p-3">
        <CustomButton
          className="btn-upload mr-5"
          title="Открыть PDF"
          onClick={() => toPDF()}
        />
        <CustomButton
          className="btn-upload mr-5"
          title="Назад"
          onClick={onClick}
        />
      </div>

      <Container className="py-3 px-20 overflow-auto" ref={targetRef}>
        {children}
      </Container>
    </Container>
  );
}
