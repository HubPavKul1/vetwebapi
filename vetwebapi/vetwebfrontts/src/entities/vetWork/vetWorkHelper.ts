import { IAnimalInVetwork } from "./model/vetWorkInterfaces";

export const vetWorkAnimalsString = (animals: IAnimalInVetwork[]) => {
  return new Set(
    animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
};
