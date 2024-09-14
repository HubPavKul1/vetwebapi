import { IAddress } from "./model/addressInterfaces";

export const addressString = (data: IAddress) => {
  return `${data.city}, ${data.street}, ${data.house_number}`;
};
