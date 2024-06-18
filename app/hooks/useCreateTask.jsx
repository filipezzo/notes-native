import { useMutation } from "@tanstack/react-query";
import { tasksService } from "../services";

export function useCreateTask() {
  return useMutation({
    mutationFn: (data) => tasksService.create(data),
  });
}
