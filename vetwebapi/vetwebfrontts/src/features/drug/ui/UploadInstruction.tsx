import clsx from "clsx";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { drugFileUploadUrl, FileUpload } from "shared/index";


interface UploadInstructionProps {
    drugId: number;
    invQueryName: string

}

export function UploadInstruction({...props}: UploadInstructionProps) {
    const [open, setOpen] = useState(false);
  return (
    <Container
      className="w-20 relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <FileUpload
        uploadUrl={drugFileUploadUrl(props.drugId)}
        accept=".pdf"
        mutationName="drugInstr upload"
        invQueryName={props.invQueryName}
        iconSrc="/pdf.jpg"
      />
      <div
        className={clsx(
          "absolute top-6 right-1 p-3 w-32 border rounded-md bg-white shadow-md text-center",
          !open && "hidden"
        )}
      >
        Загрузите инструкцию!
      </div>
    </Container>
  );
}
