import axios from "axios";
import { IAddress } from "interfaces/AddressInterfaces";
import { IEmployee } from "interfaces/EmployeeInterfaces";
import { ICompanyCard } from "interfaces/CompanyInterfaces";
import { IAnimalInVetwork } from "interfaces/VetWorkInterfaces";

export const AppService = {
  async getAll(url: string) {
    return await axios.get(url);
  },

  async getPagination(url: string, pageNum: number) {
    return await axios.get(url, { params: { page: pageNum } });
  },

  async get(url: string) {
    return (await axios.get(url)).data;
  },

  async createItem(url: string, data: object) {
    await axios
      .post<object>(url, data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },

  async createReport(
    url: string,
    dateStart?: Date | string,
    dateEnd?: Date | string
  ) {
    return await axios.get(url, {
      params: { date_start: dateStart, date_end: dateEnd },
    });
  },

  async deleteItem(url: string) {
    await axios.delete(url);
  },

  async updateItemPartial(url: string, data: object) {
    await axios
      .patch(url, data)
      .then((response) => response.data)
      .catch((err) => console.log(err));
  },

  async updateItem(url: string, data: object) {
    await axios
      .put(url, data)
      .then((response) => response.data)
      .catch((err) => console.log(err));
  },

  async uploadFile(url: string, file: FormData) {
    await axios
      .post(url, file)

      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },

  convertDateString(date: string) {
    const dateObj: Date = new Date(date);
    const month: string = dateObj.toLocaleString("default", { month: "long" });
    const year: number = dateObj.getFullYear();
    const day: number = dateObj.getDate();
    const quarter: number = Math.floor((dateObj.getMonth() + 3) / 3);
    const fullDate: string = `${day} ${month} ${year}`;
    const shortDate: string = dateObj.toLocaleDateString();

    return { day, month, year, quarter, fullDate, shortDate };
  },

  addressString(data: IAddress) {
    return `${data.city}, ${data.street}, ${data.house_number}`;
  },

  employeeWithCompanyNameString(employee: IEmployee, company: ICompanyCard) {
    return `${employee.position} ${company.short_name} ${employee.fullname}`;
  },

  employeeString(employee: IEmployee) {
    return `${employee.position} ${employee.fullname}`;
  },

  doctorString(doctor: IEmployee, clinic: string) {
    return `${doctor.position} ${clinic} ${doctor.fullname}`;
  },

  vetWorkAnimalsString(animals: IAnimalInVetwork[]) {
    return new Set(
      animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
    );
  },

  diseasesString(diseases: string[]) {
    return new Set(diseases.map((disease) => disease.toLowerCase() + ", "));
  },
};

export const timeToExpiration = (date: Date | number) => {
  const timeMs = typeof date === "number" ? date : date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  const rtf = new Intl.RelativeTimeFormat("ru", {
    numeric: "auto",
    style: "long",
    localeMatcher: "best fit",
  });

  const result = rtf.format(
    Math.floor(deltaSeconds / divisor),
    units[unitIndex]
  );

  return { result, deltaSeconds };
};
