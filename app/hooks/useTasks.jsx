import { useQuery } from "@tanstack/react-query";
import { tasksService } from "../services";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.getAll,
  });
}
