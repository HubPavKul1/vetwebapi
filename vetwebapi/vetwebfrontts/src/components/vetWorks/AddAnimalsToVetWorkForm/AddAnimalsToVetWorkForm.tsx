import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomButton } from "../../CustomButton";
import { useParams } from "react-router-dom";
import { AppService } from "../../../app.service";

import { ICompanyDetail } from "../../../interfaces/CompanyInterfaces";
import { Col, Container, Row } from "react-bootstrap";

import { AnimalFormItem } from "./AnimalFormItem";
import { useState } from "react";
import {
  IAnimalInVetwork,
  IAnimalInVetworkIn,
} from "../../../interfaces/VetWorkInterfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetDataById } from "../../../hooks/useGetDataById";
import { IAnimal } from "../../../interfaces/AnimalInterfaces";
import { useCreateItem } from "../../../hooks/useCreateItem";
import { companyDetailUrl, vetWorkAnimalsUrl } from "../../../Urls";

interface AddAnimalsToVetWorkFormProps {
  companyId: string;
  setAnimals: CallableFunction;
  workType: string;
  choosenAnimals?: IAnimalInVetwork[];
}

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
}

export function AddAnimalsToVetWorkForm({
  companyId,
  setAnimals,
  workType,
  choosenAnimals,
}: AddAnimalsToVetWorkFormProps) {
  const [animalsData, setAnimalsData] = useState<IAnimalInVetworkIn[]>([]);

  const { id } = useParams();
  const compId = Number(companyId);
  const vetWorkId = Number(id);

  const companyUrl = `/api/companies/${companyId}`;
  const url = `/api/vetwork/${id}/animals/`;

  console.log("Animals>>>", animalsData);

  const {
    reset,
    formState: { errors },
  } = useForm<IAnimalInVetworkIn[]>({
    mode: "onChange",
  });

  const { mutate } = useCreateItem(
    "add animals",
    vetWorkAnimalsUrl(vetWorkId),
    "vetwork",
    "Животное успешно добавлено!",
    reset,
    id
  );

  const { isLoading, data }: CompanyData = useGetDataById(
    "vetworkCompany",
    companyDetailUrl(compId),
    id
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  if (!data.animals) return;

  const animals = data.animals;

  const choosenAnimalsIds =
    choosenAnimals && choosenAnimals.map((animal: IAnimal) => animal.animal_id);

  const unchoosenAnimals = choosenAnimalsIds?.length
    ? animals.filter((animal) => !choosenAnimalsIds.includes(animal.id))
    : animals;

  const addAnimals: SubmitHandler<IAnimalInVetworkIn[]> = (animalsData) => {
    mutate(animalsData);
    setAnimalsData([]);
    setAnimals(false);
  };

  const backButtonOnClick = () => {
    setAnimalsData([]);
    setAnimals(false);
  };

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
          {workType === "диагностика" && <Col>Положительная реакция</Col>}
          <Col>Выбрать / отменить</Col>
        </Row>

        {unchoosenAnimals.map((animal) => (
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
