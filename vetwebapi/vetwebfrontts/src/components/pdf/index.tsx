import { Container } from "react-bootstrap";
import { usePDF } from "react-to-pdf";

import styles from "./PDF.module.scss";
import { CustomButton } from "../CustomButton";

interface PDFProps {
  setPdf: CallableFunction;
  children?: React.ReactElement | React.ReactNode;
  filename: string;
  orientation?: "p" | "l";
}

export function PDF({ setPdf, filename, orientation="p", children }: PDFProps) {
  const { toPDF, targetRef } = usePDF({ filename: `${filename}` , page: {orientation: `${orientation}`}});

  const onClick = () => {
    setPdf(false);
  };

  return (
    <Container>
      <div className={styles.btnWrap}>
        <CustomButton
          className="btn-upload"
          title="Загрузить PDF"
          onClick={() => toPDF()}
        />
        <CustomButton className="btn-upload" title="Назад" onClick={onClick} />
      </div>

      <div className="py-10 px-20" ref={targetRef}>
        {children}
      </div>
    </Container>
  );
}
