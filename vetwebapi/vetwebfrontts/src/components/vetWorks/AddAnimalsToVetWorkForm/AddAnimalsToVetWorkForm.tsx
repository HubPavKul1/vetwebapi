import { useMutation, useQuery, useQueryClient } from "react-query";
import { CustomButton } from "../../CustomButton";
import { useParams } from "react-router-dom";
import { AppService } from "../../../app.service";

import { ICompanyDetail } from "../../../interfaces/CompanyInterfaces";
import { Container } from "react-bootstrap";

import styles from "./AddAnimalsToVetWorkForm.module.scss";
import { AnimalFormItem } from "./AnimalFormItem";
import { useState } from "react";
import { IAnimalInVetworkIn } from "../../../interfaces/VetWorkInterfaces";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddAnimalsToVetWorkFormProps {
  companyId: string;
  setAnimals: CallableFunction;
}

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
}

export function AddAnimalsToVetWorkForm({
  companyId,
  setAnimals,
}: AddAnimalsToVetWorkFormProps) {
  const [animalsData, setAnimalsData] = useState<IAnimalInVetworkIn[]>([]);
  const { id } = useParams();

  const companyUrl = `/api/companies/${companyId}`;
  const url = `/api/vetwork/${id}/animals/`;

  console.log("Animals>>>", animalsData)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnimalInVetworkIn[]>({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(["add animals"], {
    mutationFn: (data: IAnimalInVetworkIn[]) =>
      AppService.createItem(url, data),
    onSuccess: () => {
      alert("Животное успешно добавлено!");
      queryClient.invalidateQueries(["vaccination", id]);
      reset();
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

  return (
    <Container className={styles.wrapper}>
      <CustomButton
        className="btn-upload"
        title="Назад"
        onClick={() => setAnimals(false)}
      />

      {animals.map((animal) => (
        <Container key={animal.id}>
          <AnimalFormItem
            animal={animal}
            setAnimalsData={setAnimalsData}
            animalsData={animalsData}
          />
        </Container>
      ))}
      <CustomButton
        className="btn-submit"
        disabled={false}
        title="Добавить"
        onClick={() => addAnimals(animalsData)}
      />
    </Container>
  );
}
