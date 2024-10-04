import { IAnimalInVetworkIn } from "entities/vetWork/model/vetWorkInterfaces";

import { SubmitHandler, useForm } from "react-hook-form";

import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { IAnimal } from "entities/animal/model/animalInterfaces";
import { CustomCheckBox } from "shared/index";

interface AnimalFormItemProps {
  animal: IAnimal;
  setAnimalsData: CallableFunction;
  animalsData: IAnimalInVetworkIn[];
  workType: string;
  disease: string;
}

export function AnimalFormItem({
  animal,
  setAnimalsData,
  animalsData,
  workType,
  disease,
}: AnimalFormItemProps) {
  const [animalChecked, setAnimalChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnimalInVetworkIn>({
    mode: "onChange",
  });

  const addAnimalData: SubmitHandler<IAnimalInVetworkIn> = (data) => {
    data.dosage?.toString() === "" && (data.dosage = 0);

    setAnimalsData([...animalsData, data]);

    setAnimalChecked(true);
  };

  const removeAnimalData = (animalId?: number) => {
    setAnimalsData(
      animalsData.filter(
        (animal) => Number(animal.animal_id) !== Number(animalId)
      )
    );

    setAnimalChecked(false);
  };

  return (
    <form onSubmit={handleSubmit(addAnimalData)}>
      <Row className="flex items-center justify-center">
        <Col md={4}>{animal.species}</Col>
        <Col md={4}>
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
        {workType === "вакцинация" && (
          <Col>
            <input
              className="border-2 w-auto text-center"
              type="number"
              step="any"
              id="dosage"
              placeholder="Доза"
              {...register("dosage")}
            />
          </Col>
        )}

        {disease === "туберкулез" && (
          <Col>
            <input
              className="border-2 w-28 text-center"
              type="number"
              step="any"
              id="dosage"
              placeholder="Доза"
              {...register("dosage")}
            />
          </Col>
        )}

        {workType === "диагностика" && (
          <Col className="flex items-center justify-center">
            <CustomCheckBox id="is_positive" register={register} />
          </Col>
        )}

        {!animalChecked ? (
          <Col>
            <Container className="flex justify-center cursor-pointer p-1">
              <button
                type="submit"
                className="hover:scale-125 transition-transform"
              >
                <IoIosAddCircleOutline fontSize={30} color="green" />
              </button>
            </Container>
          </Col>
        ) : (
          <Col>
            <Container className="flex justify-center cursor-pointer p-1">
              <CiCircleRemove
                className="hover:scale-125 transition-transform"
                onClick={() => removeAnimalData(animal.id)}
                fontSize={30}
                color="red"
              />
            </Container>
          </Col>
        )}
      </Row>
    </form>
  );
}
