import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { useEditTask } from "../hooks/useEditTask";
import { useTasks } from "../hooks/useTasks";

const taskSchema = z.object({
  title: z.string().min(1, "O título não pode ficar vazio"),
  description: z.string().min(5, "No minimo 5 caracteres."),
  step: z.enum(
    ["Em andamento", "Para fazer", "Pronto"],
    "Selecione a opção correta"
  ),
});

export function useEditController() {
  const { id } = useLocalSearchParams();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      step: "Para fazer",
    },
  });

  const { data, isLoading } = useTasks();
  const filteredTask = data?.find((task) => task.id === +id);
  const { mutateAsync, isPending } = useEditTask(filteredTask.id);
  const nav = useNavigation();
  const queryClient = useQueryClient();

  const onSubmit = async ({ title, description, step }) => {
    try {
      const updatedTask = {
        title,
        description,
        step,
      };
      await mutateAsync(updatedTask);

      queryClient.invalidateQueries(["tasks"]);
      Toast.show({
        type: "info",
        text1: "Tarefa editada com sucesso!",
        visibilityTime: 2000,
        autoHide: true,
      });
      nav.navigate("index");
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

  useEffect(() => {
    if (filteredTask) {
      setValue("title", filteredTask.title);
      setValue("description", filteredTask.description);
      setValue("step", filteredTask.step);
    }
  }, [filteredTask]);
  return {
    isLoading,
    control,
    errors,
    isPending,
    handleSubmit,
    onSubmit,
  };
}
