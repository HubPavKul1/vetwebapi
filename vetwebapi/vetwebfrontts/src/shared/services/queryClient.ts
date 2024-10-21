import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => alert(error.message),
  }),
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
