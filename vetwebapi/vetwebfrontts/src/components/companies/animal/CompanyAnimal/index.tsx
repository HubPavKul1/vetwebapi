import { IAnimal } from "../../../../interfaces/AnimalInterfaces";
import { useMutation, useQueryClient } from "react-query";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { AppService } from "../../../../app.service";
import { Col, Row } from "react-bootstrap";

import styles from "./CompanyAnimal.module.scss"

interface CompanyAnimalProps {
  animal: IAnimal;
  company_id: number;
}

export function CompanyAnimal({ animal, company_id }: CompanyAnimalProps) {
  const id = company_id.toString();

  const url = `/api/companies/${id}/animals/${animal.id}`;

  const queryClient = useQueryClient();

  const { mutate } = useMutation(["delete animal"], {
    mutationFn: () => AppService.deleteItem(url),
    onSuccess: () => {
      alert("Животное успешно удалено!");
      queryClient.invalidateQueries(["company", id]);
    },
  });

  const deleteAnimal = () => {
    mutate();
  };

  const date_of_birth = AppService.convertDateString(
    animal.date_of_birth
  ).shortDate;

  return (
    <Row key={animal.id} className={styles.tableRow}>
      <Col>{animal.species}</Col>
      <Col>{animal.gender}</Col>
      <Col>{date_of_birth}</Col>
      <Col>{animal.nickname}</Col>
      <Col>{animal.identification}</Col>
      <Col>
        <BsPencilSquare className="edit-icon" />
      </Col>
      <Col>
        <BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal} />
      </Col>
    </Row>
  );
}
