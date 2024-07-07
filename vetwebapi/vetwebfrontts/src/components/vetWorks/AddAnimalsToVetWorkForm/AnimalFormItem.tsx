import { IAnimal } from "../../../interfaces/AnimalInterfaces";
import { IAnimalInVetworkIn } from "../../../interfaces/VetWorkInterfaces";
import { CustomButton } from "../../CustomButton";

import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./AddAnimalsToVetWorkForm.module.scss";
import { Col, Row } from "react-bootstrap";

interface AnimalFormItemProps {
  animal: IAnimal;
  setAnimalsData: CallableFunction;
  animalsData: IAnimalInVetworkIn[];
}

export function AnimalFormItem({
  animal,
  setAnimalsData,
  animalsData,
}: AnimalFormItemProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnimalInVetworkIn>({
    mode: "onChange",
  });

  const addAnimalData: SubmitHandler<IAnimalInVetworkIn> = (data) => {
    
    data.dosage?.toString() === "" && (data.dosage = 0);
    
    
    setAnimalsData([...animalsData, data]);

  };

  return (
    <form onSubmit={handleSubmit(addAnimalData)}>
      <Row className={styles.formWrap}>
        <Col>{animal.species}</Col>
        <Col>
          <label htmlFor="animal_id">
            {animal.nickname}
            <input
              type="hidden"
              defaultValue={animal.id}
              id="animal_id"
              {...register("animal_id")}
            />
          </label>
        </Col>
        <Col>
          <input
            type="number"
            step="any"
            id="dosage"
            placeholder="Доза"
            {...register("dosage")}
          />
        </Col>
        <Col>
          <label htmlFor="is_positive">
            Положительная реакция
            <input
              type="checkbox"
              id="is_positive"
              {...register("is_positive")}
            />
          </label>
        </Col>

        <Col>
          <CustomButton
            className="btn-submit"
            disabled={false}
            title="Добавить"
          />
        </Col>
        <Col></Col>
      </Row>
    </form>
  );
}
