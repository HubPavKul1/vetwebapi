import { IBase } from "shared/index";

interface IEmployeeBase {
  lastname: string;
  firstname: string;
  patronymic: string;
}

export interface IEmployee extends IEmployeeBase {
  id: number;
  position: string;
  fullname: string;
}

export interface IEmployeeCreate extends IEmployeeBase {
  position_id: number;
}

export interface IPositions {
  positions?: IBase[];
}
