import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { tasksService } from "../services";

export function useStatusTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tasksService.patching,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(`Erro ao atualizar o status: ${error.message}`);
      } else {
        throw error;
      }
    },
  });
}
