import { useMutation, useQuery } from "react-query";
import { CustomButton } from "../../CustomButton";
import { useParams } from "react-router-dom";
import { AppService } from "../../../app.service";

import { ICompanyDetail } from "../../../interfaces/CompanyInterfaces";
import { Col, Container, Row } from "react-bootstrap";

import { AnimalFormItem } from "./AnimalFormItem";
import { useState } from "react";
import { IAnimalInVetworkIn } from "../../../interfaces/VetWorkInterfaces";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddAnimalsToVetWorkFormProps {
  companyId: string;
  setAnimals: CallableFunction;
  workType: string;
}

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
}

export function AddAnimalsToVetWorkForm({
  companyId,
  setAnimals,
  workType,
}: AddAnimalsToVetWorkFormProps) {
  const [animalsData, setAnimalsData] = useState<IAnimalInVetworkIn[]>([]);
  const { id } = useParams();

  const companyUrl = `/api/companies/${companyId}`;
  const url = `/api/vetwork/${id}/animals/`;

  console.log("Animals>>>", animalsData);

  const {
    reset,
    formState: { errors },
  } = useForm<IAnimalInVetworkIn[]>({
    mode: "onChange",
  });

  const { mutate } = useMutation(["add animals"], {
    mutationFn: (data: IAnimalInVetworkIn[]) =>
      AppService.createItem(url, data),
    onSuccess: () => {
      alert("Животное успешно добавлено!");
      reset();
      setAnimals(false);
    },
  });

  const { isLoading, data }: CompanyData = useQuery(
    ["vetworkCompany", id],
    () => AppService.get(companyUrl),
    {
      enabled: !!id,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  if (!data.animals) return;

  const animals = data.animals;

  const addAnimals: SubmitHandler<IAnimalInVetworkIn[]> = (animalsData) => {
    mutate(animalsData);
    setAnimalsData([]);
  };

  const backButtonOnClick = () => {
    setAnimalsData([]);
    setAnimals(false);
  }

  return (
    <Container className="mb-8 p-8">
      <CustomButton
        className="btn-upload mb-3"
        title="Назад"
        onClick={() => backButtonOnClick()}
      />
      <Container className="mb-8 text-center">
        <h1 className="mb-8 text-3xl underline">Выберите животных для описи</h1>

        <Row className="border-2 border-black font-bold">
          <Col>Вид животного</Col>
          <Col>Кличка</Col>
          <Col>Дозировка препарата</Col>
          {workType === "диагностика" &&
          <Col>Положительная реакция</Col>
          }
          <Col>Выбрать / отменить</Col>

        </Row>

        {animals.map((animal) => (
          <Container key={animal.id}>
            <AnimalFormItem
              animal={animal}
              setAnimalsData={setAnimalsData}
              animalsData={animalsData}
              workType={workType}
            />
          </Container>
        ))}
      </Container>
      <Container className="w-96">
        <CustomButton
          className="btn-submit"
          disabled={false}
          title="Добавить выбранных животных"
          onClick={() => addAnimals(animalsData)}
        />
      </Container>
    </Container>
  );
}
