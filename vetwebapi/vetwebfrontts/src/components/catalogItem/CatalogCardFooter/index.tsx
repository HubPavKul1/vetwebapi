import { Col, Container, Row } from "react-bootstrap";

import { FileUpload } from "../../FileUpload";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../../app.service";

interface CatalogCardFooterProps {
  hasFileUploader?: boolean;
  fileUploadUrl?: string;
  accept?: string;
  mutationName?: string;
  invQueryName?: string;
  iconSrc?: string;
  delUrl: string;
  cardTitle: string;
}

export function CatalogCardFooter({ ...props }: CatalogCardFooterProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(["delete item"], {
    mutationFn: () => AppService.deleteItem(props.delUrl),
    onSuccess: () => {
      alert(`${props.cardTitle} успешно удалено!`);
      queryClient.invalidateQueries([`${props.invQueryName}`]);
    },
  });

  const deleteItem = () => {
    mutate();
  };

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
        ): <Col sm={10}></Col>}
        <Col sm={2}>
          <BsFillTrash3Fill className="delete-icon" onClick={deleteItem} />
        </Col>
      </Row>
    </Container>
  );
}
