import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { tasksService } from "../services";

export function useRemoveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(`Erro ao deletar a tarefa: ${error.message}`);
      } else {
        throw error;
      }
    },
  });
}
