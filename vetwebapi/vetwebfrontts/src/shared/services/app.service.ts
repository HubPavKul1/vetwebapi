import axios from "axios";
import { IUserLogin } from "shared/model/BaseInterfaces";
import { userLoginUrl, userLogoutUrl } from "shared/urls/userUrls";


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

  async login(data: IUserLogin) {
    
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded", "accept": "application/json"},
      body: new URLSearchParams({username: data.username, password: data.password}).toString(),
      
    }
    await axios
      .post(userLoginUrl, requestOptions, {withCredentials: true})
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },

  async logout(url = userLogoutUrl) {
    await axios.post(url, {withCredentials: true});
  },
};
