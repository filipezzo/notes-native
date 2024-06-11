import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigation } from "expo-router";
import { tasksService } from "../services";

export function useEditTask(id) {
  const nav = useNavigation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => tasksService.update(+id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      nav.navigate("index");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(`Erro ao atualizar a tarefa: ${error.message}`);
      } else {
        throw error;
      }
    },
  });
}
