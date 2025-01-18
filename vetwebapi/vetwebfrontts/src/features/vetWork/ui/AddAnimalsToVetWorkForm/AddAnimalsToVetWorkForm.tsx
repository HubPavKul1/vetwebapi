import { useParams } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";

import { AnimalFormItem } from "./AnimalFormItem";
import { useState } from "react";
import {
  IAnimalInVetwork,
  IAnimalInVetworkIn,
} from "entities/vetWork/model/vetWorkInterfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetDataById } from "shared/hooks/useGetDataById";
import { useCreateItem } from "shared/hooks/useCreateItem";
import { companyDetailUrl } from "shared/urls/companyUrls";
import { vetWorkAnimalsUrl } from "shared/urls/vetWorkUrls";
import { ButtonCreate } from "shared/index";
import { ICompanyDetail } from "entities/company/model/companyInterfaces";
import { IAnimal } from "entities/animal/model/animalInterfaces";
import useVetWorkAnimalsStore from "features/vetWork/stores/useVetWorkAnimalsStore";
import { DISEASES, WORKTYPES } from "shared/constants/vetworkConst";

interface AddAnimalsToVetWorkFormProps {
  companyId: string;
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
  workType,
  choosenAnimals,
  disease,
}: AddAnimalsToVetWorkFormProps) {
  const [animalsData, setAnimalsData] = useState<IAnimalInVetworkIn[]>([]);

  const { id } = useParams();
  const compId = Number(companyId);
  const vetWorkId = Number(id);
  const unsetAnimals = useVetWorkAnimalsStore((state) => state.unsetAnimals);
  let dosageCount = 0;
  animalsData.length &&
    animalsData.map((animal: IAnimalInVetworkIn) =>
      animal.dosage ? (dosageCount += Number(animal.dosage)) : dosageCount
    );

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
    unsetAnimals();
  };

  const backButtonOnClick = () => {
    setAnimalsData([]);
    unsetAnimals();
  };

  return (
    <Container className="mb-8 text-indigo-900 ">
      <Container className="pt-8 text-center sticky top-0 z-10 bg-gradient-to-r from-slate-100 to-slate-300">
        <Row>
          <Col md={1}>
            <ButtonCreate title="Назад" onClick={() => backButtonOnClick()} />
          </Col>
          <Col md={11}></Col>
        </Row>
        <h1 className="mb-8 text-3xl uppercase">Выберите животных для описи</h1>

        <Row className="text-left text-blue-800 font-bold">
          <h5>Голов: {animalsData.length}</h5>
          <h5>Доз: {dosageCount.toFixed(4)}</h5>
        </Row>
        <Row className="border border-black bg-gray-400 opacity-100 font-bold p-2">
          <Col md={1}>N п/п</Col>
          <Col md={3}>Вид животного</Col>
          <Col md={4}>Кличка</Col>
          {workType === WORKTYPES.vaccination && <Col>Дозировка препарата</Col>}
          {workType === WORKTYPES.treatment && <Col>Дозировка препарата</Col>}

          {disease === DISEASES.tbc && <Col md={2}>Дозировка препарата</Col>}

          {workType === WORKTYPES.diagnostic && <Col>Положительное</Col>}
          <Col>Выбрать / отменить</Col>
        </Row>
      </Container>
      <Container className="mb-8 text-center">
        {unchoosenAnimals.map((animal, index) => (
          <Row key={animal.id} className="border border-black h-auto">
            <AnimalFormItem
              index={index + 1}
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
        <ButtonCreate
          className="btn-submit"
          disabled={false}
          title="Добавить выбранных животных"
          onClick={() => addAnimals(animalsData)}
        />
      </Container>
    </Container>
  );
}
