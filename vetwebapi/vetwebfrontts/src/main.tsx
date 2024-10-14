import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "assets/css/normalize.css";
import "assets/css/bootstrap.min.css";
import "assets/css/style.css";
import "assets/sass/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "app/App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
