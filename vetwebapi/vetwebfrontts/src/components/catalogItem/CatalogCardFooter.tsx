import { Col, Container, Row } from "react-bootstrap";
import { FileUpload } from "shared/ui/FileUpload";
import { DeleteItem } from "shared/ui/DeleteItem";
import { useState } from "react";
import clsx from "clsx";

interface CatalogCardFooterProps {
  hasFileUploader?: boolean;
  fileUploadUrl?: string;
  accept?: string;
  mutationName?: string;
  invQueryName: string;
  iconSrc?: string;
  delUrl: string;
  cardTitle: string;
}

export function CatalogCardFooter({ ...props }: CatalogCardFooterProps) {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Row>
        {props.hasFileUploader && props.fileUploadUrl ? (
          <>
            <Col sm={8}></Col>
            <Col sm={2}>
              <Container
                className="w-20 relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <FileUpload
                  uploadUrl={props.fileUploadUrl}
                  accept={props.accept}
                  mutationName={props.mutationName}
                  invQueryName={props.invQueryName}
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
            </Col>
          </>
        ) : (
          <Col sm={10}></Col>
        )}
        <Col sm={2}>
          <DeleteItem
            queryKey={props.invQueryName}
            url={props.delUrl}
            alertMessage={`${props.cardTitle} успешно удалено!`}
          />
        </Col>
      </Row>
    </Container>
  );
}
