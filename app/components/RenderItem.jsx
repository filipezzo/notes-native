import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { getNextStep } from "../helpers/getNextStep";
import { useRemoveTask } from "../hooks/useRemoveTask";
import { useStatusTask } from "../hooks/useStatusTask";

export default function RenderItem({ item }) {
  const nav = useNavigation();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: removeTask } = useRemoveTask();

  const { isPending: isPendingTask, mutateAsync: updateTask } = useStatusTask();

  const handlePress = async () => {
    const nextStep = getNextStep(item.step);
    await updateTask({ id: item.id, newStep: nextStep });
  };

  const handleDelete = async () => await removeTask(item.id);

  const handleEdit = () => {
    const id = item.id;
    nav.navigate("edit", { id });
  };

  return (
    <View className="  rounded-md border-none shadow-md p-5 bg-black my-2 opacity-95">
      <Text className="text-xl  font-bold text-white">{item.title}</Text>
      <Text className="text-white opacity-60 mt-2 mb-6">
        {item.description}
      </Text>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isPendingTask}
        className="border rounded-md px-2"
      >
        <Text className="text-white">
          {isPendingTask
            ? "Alterando status..."
            : "Clique aqui para mudar o status da tarefa"}
        </Text>
      </TouchableOpacity>
      <View className="flex-row">
        <TouchableOpacity
          onPress={handleEdit}
          className="border rounded-md px-2"
        >
          <Text className="text-orange-400 mt-2">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          className="border rounded-md px-2"
          disabled={isPending}
        >
          <Text className="text-rose-400 mt-2">
            {isPending ? "Deletando..." : "Deletar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
