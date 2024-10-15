import { useAppDispatch } from "app/hooks/redux";
import { actClose } from "features/vetWork/slices/actSlice";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
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
    page: { margin: Margin.SMALL, orientation: `${orientation}` },
  });

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(actClose());
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
