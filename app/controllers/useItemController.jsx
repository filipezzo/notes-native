import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigation } from "expo-router";
import Toast from "react-native-toast-message";
import { getNextStep } from "../helpers/getNextStep";
import { useRemoveTask } from "../hooks/useRemoveTask";
import { useStatusTask } from "../hooks/useStatusTask";

export function useItemController(item) {
  const nav = useNavigation();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: removeTask } = useRemoveTask();

  const { isPending: isPendingTask, mutateAsync: updateTask } = useStatusTask();

  const handlePress = async () => {
    try {
      const nextStep = getNextStep(item.step);
      await updateTask({ id: item.id, newStep: nextStep });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      Toast.show({
        type: "info",
        text1: "Status da tarefa modificado com sucesso!",
        visibilityTime: 2000,
        autoHide: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1: `erro ${error.message}`,
        });
      } else {
        throw error;
      }
    }
  };

  const handleDelete = async () => {
    try {
      await removeTask(item.id);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      Toast.show({
        type: "info",
        text1: "Tarefa deletada com sucesso!",
        visibilityTime: 2000,
        autoHide: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1: `erro ${error.message}`,
        });
      } else {
        throw error;
      }
    }
  };

  const handleEdit = () => {
    const id = item.id;
    nav.navigate("edit", { id });
  };
  return {
    isPending,
    handleDelete,
    handleEdit,
    handlePress,
    isPendingTask,
  };
}
