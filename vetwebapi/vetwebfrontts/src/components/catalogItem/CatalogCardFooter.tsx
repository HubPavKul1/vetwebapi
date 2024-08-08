import { Col, Container, Row } from "react-bootstrap";
import { FileUpload } from "../fileUpload";
import { DeleteItem } from "../DeleteItem";

interface CatalogCardFooterProps {
  hasFileUploader?: boolean;
  fileUploadUrl: string;
  accept?: string;
  mutationName: string;
  invQueryName: string;
  iconSrc?: string;
  delUrl: string;
  cardTitle: string;
}

export function CatalogCardFooter({ ...props }: CatalogCardFooterProps) {
  return (
    <Container>
      <Row>
        {props.hasFileUploader ? (
          <>
            <Col sm={8} className="text-right">
              <h5>Загрузите инструкцию </h5>
            </Col>
            <Col sm={2}>
              <Container className="w-20">
                <FileUpload
                  uploadUrl={props.fileUploadUrl}
                  accept={props.accept}
                  mutationName={props.mutationName}
                  invQueryName={props.invQueryName}
                />
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
            mutationKey="deleteItem"
            alertMessage={`${props.cardTitle} успешно удалено!`}
          />
        </Col>
      </Row>
    </Container>
  );
}
