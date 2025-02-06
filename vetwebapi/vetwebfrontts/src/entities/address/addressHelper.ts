import { IAddress } from "./model/addressInterfaces";

export const addressString = (data: IAddress) => {
  let address = "";
  data.street.toLowerCase() !== "нет"
    ? (address = `${data.city}, ${data.street}, дом ${data.house_number}`)
    : (address = `${data.city}, дом ${data.house_number}`);
  return address;
};
