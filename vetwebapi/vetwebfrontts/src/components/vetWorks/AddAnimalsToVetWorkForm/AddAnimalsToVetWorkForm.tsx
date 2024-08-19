import { CustomButton } from "components/CustomButton";
import { useParams } from "react-router-dom";

import { ICompanyDetail } from "interfaces/CompanyInterfaces";
import { Col, Container, Row } from "react-bootstrap";

import { AnimalFormItem } from "./AnimalFormItem";
import { useState } from "react";
import {
  IAnimalInVetwork,
  IAnimalInVetworkIn,
} from "interfaces/VetWorkInterfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetDataById } from "hooks/useGetDataById";
import { IAnimal } from "interfaces/AnimalInterfaces";
import { useCreateItem } from "hooks/useCreateItem";
import { companyDetailUrl } from "urls/companyUrls";
import { vetWorkAnimalsUrl } from "urls/vetWorkUrls";

interface AddAnimalsToVetWorkFormProps {
  companyId: string;
  setAnimals: CallableFunction;
  workType: string;
  choosenAnimals?: IAnimalInVetwork[];
  disease: string;
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
  disease,
}: AddAnimalsToVetWorkFormProps) {
  const [animalsData, setAnimalsData] = useState<IAnimalInVetworkIn[]>([]);

  const { id } = useParams();
  const compId = Number(companyId);
  const vetWorkId = Number(id);

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

        <Row className="border border-black font-bold p-2">
          <Col>Вид животного</Col>
          <Col>Кличка</Col>
          {workType === "вакцинация" && <Col>Дозировка препарата</Col>}

          {disease === "туберкулез" && <Col>Дозировка препарата</Col>}

          {workType === "диагностика" && <Col>Положительная реакция</Col>}
          <Col>Выбрать / отменить</Col>
        </Row>

        {unchoosenAnimals.map((animal) => (
          <Row key={animal.id} className="border border-black">
            <AnimalFormItem
              animal={animal}
              setAnimalsData={setAnimalsData}
              animalsData={animalsData}
              workType={workType}
              disease={disease}
            />
          </Row>
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
