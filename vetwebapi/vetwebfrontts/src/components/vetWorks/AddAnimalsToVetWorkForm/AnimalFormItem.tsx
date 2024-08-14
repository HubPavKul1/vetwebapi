import { IAnimal } from "../../../interfaces/AnimalInterfaces";
import { IAnimalInVetworkIn } from "../../../interfaces/VetWorkInterfaces";

import { SubmitHandler, useForm } from "react-hook-form";

import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import CustomCheckBox from "../../CustomCheckBox";

interface AnimalFormItemProps {
  animal: IAnimal;
  setAnimalsData: CallableFunction;
  animalsData: IAnimalInVetworkIn[];
  workType: string;
}

export function AnimalFormItem({
  animal,
  setAnimalsData,
  animalsData,
  workType,
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
      <Row className="flex items-center justify-center border-b-2 border-b-black">
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
            className="border-2 w-auto text-center"
            type="number"
            step="any"
            id="dosage"
            placeholder="Доза"
            {...register("dosage")}
          />
        </Col>
        {workType === "диагностика" && (
          <Col className="flex items-center">
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
