import { Col, Container, Row } from "react-bootstrap";

import styles from "./CatalogCardFooter.module.scss";
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
    <Container className={styles.services}>
      <Row>
        <Col sm={7}>
          {props.hasFileUploader && <p>Загрузите инструкцию </p>}</Col>
        <Col>
          <Container className={styles.fileUpload}>
            {props.hasFileUploader && (
              <FileUpload
                uploadUrl={props.fileUploadUrl}
                accept={props.accept}
                mutationName={props.mutationName}
                invQueryName={props.invQueryName}
                iconSrc={props.iconSrc}
              />
            )}
          </Container>
        </Col>
        <Col>
          <BsFillTrash3Fill className="delete-icon" onClick={deleteItem} />
        </Col>
      </Row>
    </Container>
  );
}
