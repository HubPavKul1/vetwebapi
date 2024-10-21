import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "assets/css/normalize.css";
import "assets/css/bootstrap.min.css";
import "assets/css/style.css";
import "assets/sass/index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { App } from "app/App";
import { queryClient } from "shared/services/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
