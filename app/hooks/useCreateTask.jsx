import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigation } from "expo-router";
import Toast from "react-native-toast-message";
import { tasksService } from "../services";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const nav = useNavigation();

  return useMutation({
    mutationFn: (data) => tasksService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      Toast.show({
        type: "success",
        text1: "Tarefa criada com sucesso",
        visibilityTime: 2000,
        autoHide: true,
      });
      nav.navigate("index");
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
