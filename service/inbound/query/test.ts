import { QueryFn } from "@/domain/sharedkernel";
import { API } from "@/service/lib/Http/adapter";
import { useQuery } from "@tanstack/react-query";

const testKeys = {
  getExampleData: (params: ExampleDateParams) => ["exampleData", params.id],
};

type ExampleDateParams = {
  id: string;
};

type ExampleDataResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const getExampleData = async (params: ExampleDateParams) => {
  const res = await API.get<ExampleDataResponse>(`/todos/${params.id}`);
  return res;
};

export const useExampleDataQuery: QueryFn<
  ExampleDateParams,
  ExampleDataResponse,
  typeof testKeys.getExampleData,
  typeof getExampleData
> = ({ params, queryOptions }) => {
  return useQuery({
    queryKey: ["exampleData", params.id],
    queryFn: () => getExampleData(params),
    ...queryOptions,
  });
};

useExampleDataQuery.key = testKeys.getExampleData;
useExampleDataQuery.fetcher = getExampleData;
