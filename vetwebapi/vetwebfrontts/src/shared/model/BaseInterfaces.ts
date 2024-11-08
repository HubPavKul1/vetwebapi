import React from "react";

export interface IBase {
  id: number;
  name: string;
}

export interface IQueryData {
  data?: IBase[];
  isLoading: boolean;
  error?: Error | null;
}

export interface ISelectData {
  data: IBase[];
}

export interface IDateRange {
  date_start: string;
  date_end: string;
}

export interface IReactElement {
  id: number;
  element: React.ReactElement;
}

export interface ITableHeaders {
  id: number;
  title: string;
}

export interface ICreateItemFormInterface {
  url: string;
  queryKey: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
