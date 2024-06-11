import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigation } from "expo-router";
import { tasksService } from "../services";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const nav = useNavigation();
  return useMutation({
    mutationFn: (data) => tasksService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      nav.navigate("index");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(`Erro ao criar a tarefa ${error.message}`);
      } else {
        throw error;
      }
    },
  });
}
