import { useMutation } from "@tanstack/react-query";
import { tasksService } from "../services";

export function useStatusTask() {
  return useMutation({
    mutationFn: tasksService.patching,
  });
}
