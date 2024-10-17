import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "assets/css/normalize.css";
import "assets/css/bootstrap.min.css";
import "assets/css/style.css";
import "assets/sass/index.css";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { App } from "app/App";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => alert(error.message),
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
