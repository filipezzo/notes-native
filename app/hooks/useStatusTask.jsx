import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { tasksService } from "../services";

export function useStatusTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tasksService.patching,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      Toast.show({
        type: "info",
        text1: "Status da tarefa modificado com sucesso!",
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
