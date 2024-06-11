import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { tasksService } from "../services";

export function useRemoveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      Toast.show({
        type: "info",
        text1: "Tarefa deletada com sucesso!",
        visibilityTime: 2000,
        autoHide: true,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1: `erro ${error.message}`,
        });
      } else {
        throw error;
      }
    },
  });
}
