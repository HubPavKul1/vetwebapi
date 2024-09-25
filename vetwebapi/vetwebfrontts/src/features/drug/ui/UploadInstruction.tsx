import { useState } from "react";
import { Container } from "react-bootstrap";
import { DropdownMessage, drugFileUploadUrl, FileUpload } from "shared/index";

interface UploadInstructionProps {
  drugId: number;
  invQueryName: string;
}

export function UploadInstruction({ ...props }: UploadInstructionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container
      className="w-20 relative mb-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <FileUpload
        uploadUrl={drugFileUploadUrl(props.drugId)}
        accept=".pdf"
        mutationName="drugInstr upload"
        invQueryName={props.invQueryName}
        iconSrc="/pdf.jpg"
      />
      <DropdownMessage isOpen={isOpen} message="Загрузите инструкцию!" />
    </Container>
  );
}
