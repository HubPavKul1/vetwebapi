
import { useQuery } from "react-query";
import { CustomButton } from "../../button/CustomButton";
import { useParams } from "react-router-dom";
import { AppService } from "../../../app.service";


import { ICompanyDetail } from "../../../interfaces/CompanyInterfaces";
import { Container } from "react-bootstrap";

import styles from "./AddAnimalsToVetWorkForm.module.scss";
import { AnimalFormItem } from "./AnimalFormItem";
import { useState } from "react";
import { IAnimalInVetworkIn } from "../../../interfaces/VetWorkInterfaces";

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

    const [animalsData, setAnimalsData] = useState<IAnimalInVetworkIn[]>([])




  const { id } = useParams();

  const companyUrl = `/api/companies/${companyId}`;

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

  console.log("StateDATA>>>", animalsData)

  return (
    <Container className={styles.wrapper}>
      <CustomButton
        className="btn-upload"
        title="Назад"
        onClick={() => setAnimals(false)}
      />

      {animals.map((animal) => (
        <Container key={animal.id}>
          <AnimalFormItem animal={animal} setAnimalsData={setAnimalsData} animalsData={animalsData}/>
        </Container>
      ))}
    </Container>
  );
}
