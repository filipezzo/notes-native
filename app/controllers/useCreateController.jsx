import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { useCreateTask } from "../hooks/useCreateTask";
const taskSchema = z.object({
  title: z.string().min(1, "O título não pode ficar vazio"),
  description: z.string().min(5, "No minimo 5 caracteres."),
  step: z.enum(
    ["Em andamento", "Para fazer", "Pronto"],
    "Selecione a opção correta"
  ),
});

export function useCreateController() {
  const queryClient = useQueryClient();
  const nav = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      step: "Para fazer",
    },
  });

  const { mutateAsync, isPending } = useCreateTask();

  const onSubmit = async ({ title, description, step }) => {
    try {
      const newTask = {
        title,
        description,
        step,
      };
      await mutateAsync(newTask);
      queryClient.invalidateQueries(["tasks"]);
      Toast.show({
        type: "success",
        text1: "Tarefa criada com sucesso",
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

  return {
    control,
    errors,
    isPending,
    handleSubmit,
    onSubmit,
  };
}
