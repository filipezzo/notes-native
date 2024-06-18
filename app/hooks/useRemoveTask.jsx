import { useMutation } from "@tanstack/react-query";
import { tasksService } from "../services";

export function useRemoveTask() {
  return useMutation({
    mutationFn: tasksService.remove,
  });
}
