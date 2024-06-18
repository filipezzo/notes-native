import { useMutation } from "@tanstack/react-query";
import { tasksService } from "../services";

export function useEditTask(id) {
  return useMutation({
    mutationFn: (data) => tasksService.update(+id, data),
  });
}
