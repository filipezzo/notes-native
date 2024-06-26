import React from "react";
import { FlatList, Text, View } from "react-native";
import PageLayout from "./components/PageLayout";
import RenderItem from "./components/RenderItem";
import { Select } from "./components/Select";
import Spinner from "./components/Spinner";
import { useHomeController } from "./controllers/useHomeController";

export default function Home() {
  const { filterby, filteredTasks, handleChange, isLoading, tasks } =
    useHomeController();

  return (
    <PageLayout isHomepage>
      <View>
        <Text className="text-2xl mt-10 font-bold text-black">Tarefas</Text>
        <Select value={filterby} onValueChange={handleChange} />
      </View>

      {isLoading ? (
        <Spinner />
      ) : tasks?.length > 0 ? (
        <FlatList
          className="mt-4 h-[500px] overflow-scroll"
          data={filteredTasks}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text className="mt-10 text-2xl">Adicione uma tarefa</Text>
      )}
    </PageLayout>
  );
}
