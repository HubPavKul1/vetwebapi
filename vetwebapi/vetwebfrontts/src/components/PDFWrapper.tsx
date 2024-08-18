import { Container } from "react-bootstrap";
import { usePDF } from "react-to-pdf";

import { CustomButton } from "components/CustomButton";

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
    filename: `${filename}`,
    page: { orientation: `${orientation}` },
  });

  const onClick = () => {
    setPdf(false);
  };

  return (
    <Container>
      <div className="flex p-3">
        <CustomButton
          className="btn-upload mr-5"
          title="Загрузить PDF"
          onClick={() => toPDF()}
        />
        <CustomButton
          className="btn-upload mr-5"
          title="Назад"
          onClick={onClick}
        />
      </div>

      <Container className="py-10 px-20 overflow-auto" ref={targetRef}>
        {children}
      </Container>
    </Container>
  );
}
