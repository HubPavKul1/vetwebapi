import axios from "axios";
import { userLoginUrl, userLogoutUrl } from "shared/urls/userUrls";

const client = axios.create({ withCredentials: true });

export const AppService = {
  async getAll(url: string) {
    return await client.get(url);
  },

  async getPagination(url: string, pageNum: number) {
    return await client.get(url, {
      params: { page: pageNum },
    });
  },

  async get(url: string) {
    return (await client.get(url)).data;
  },

  async createItem(url: string, data: object) {
    await client
      .post<object>(url, data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },

  async createReport(
    url: string,
    dateStart?: Date | string,
    dateEnd?: Date | string
  ) {
    return await client.get(url, {
      params: { date_start: dateStart, date_end: dateEnd },
    });
  },

  async deleteItem(url: string) {
    await client.delete(url);
  },

  async updateItemPartial(url: string, data: object) {
    await client
      .patch(url, data)
      .then((response) => response.data)
      .catch((err) => console.log(err));
  },

  async updateItem(url: string, data: object) {
    await client
      .put(url, data)
      .then((response) => response.data)
      .catch((err) => console.log(err));
  },

  async uploadFile(url: string, file: FormData) {
    await client
      .post(url, file)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },

  async login(data: FormData) {
    await client
      .postForm(userLoginUrl, data)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },

  async logout(url = userLogoutUrl) {
    await client.post(url);
  },
};
