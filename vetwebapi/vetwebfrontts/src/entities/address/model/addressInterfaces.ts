import { IBase } from "shared/index";


export interface IAddressIn {
  street_id: number;
  house_number: string;
  phone_number1: string;
  phone_number2: string | null;
}

export interface IAddress {
  id: number;
  district: string;
  city: string;
  street: string;
  house_number: string;
  phone_number1: string;
  phone_number2: string | null;
}

export interface IRegions {
  regions?: IBase[];
}

export interface IDistricts {
  districts?: IBase[];
}

export interface ICities {
  cities?: IBase[];
}

export interface IStreets {
  streets?: IBase[];
}
