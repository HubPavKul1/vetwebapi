import { IAnimal } from "../../../../interfaces/AnimalInterfaces";
import { AppService } from "../../../../app.service";
import { Col, Row } from "react-bootstrap";

import { UpdateItem } from "../../../UpdateItem";
import { UpdateAnimalForm } from "../UpdateAnimalForm";
import { DeleteItem } from "../../../DeleteItem";

interface CompanyAnimalProps {
  animal: IAnimal;
  company_id: number;
}

export function CompanyAnimal({ animal, company_id }: CompanyAnimalProps) {
  const id = company_id.toString();

  const url = `/api/companies/${id}/animals/${animal.id}`;

  const date_of_birth = AppService.convertDateString(
    animal.date_of_birth
  ).shortDate;

  return (
    <Row
      key={animal.id}
      className="border-b border-black text-center items-center justify-center"
    >
      <Col>{animal.species}</Col>
      <Col>{animal.gender}</Col>
      <Col>{date_of_birth}</Col>
      <Col>
        <UpdateItem>
          <UpdateAnimalForm
            animal={animal}
            updateData={animal.date_of_birth}
            updateFieldName="date_of_birth"
            updateFieldType="date"
          />
        </UpdateItem>
      </Col>
      <Col>{animal.nickname}</Col>
      <Col>
        <UpdateItem>
          <UpdateAnimalForm
            animal={animal}
            updateData={animal.nickname}
            updateFieldName="nickname"
            updateFieldType="text"
          />
        </UpdateItem>
      </Col>
      <Col>{animal.identification}</Col>
      <Col>
        <UpdateItem>
          <UpdateAnimalForm
            animal={animal}
            updateData={animal.identification}
            updateFieldName="identification"
            updateFieldType="text"
          />
        </UpdateItem>
      </Col>
      <Col>
        <DeleteItem
          queryKeyId={id}
          queryKey="company"
          mutationKey="deleteAnimal"
          alertMessage="Животное успешно удалено!"
          url={url}
        />
      </Col>
    </Row>
  );
}
