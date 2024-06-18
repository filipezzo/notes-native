import React from "react";
import { Controller } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import PageLayout from "./components/PageLayout";
import { Select } from "./components/Select";
import Spinner from "./components/Spinner";
import { useEditController } from "./controllers/useEditController";

export default function Edit() {
  const { control, onSubmit, handleSubmit, errors, isLoading, isPending } =
    useEditController();

  if (isLoading) {
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <View className="mt-5 p-5  ">
        <Text className="text-2xl font-bold">Editar tarefa</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border h-10 rounded-md px-4 mt-5 focus:border-blue-500"
              placeholder="Título"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors?.title && (
          <Text className="text-rose-500 mt-2 text-sm">
            {errors.title.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border h-10 rounded-md px-4 mt-5 focus:border-blue-500"
              placeholder="Descrição"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />

        {errors?.description && (
          <Text className="text-rose-500 mt-2 text-sm">
            {errors.description.message}
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Select value={value} onValueChange={onChange} />
          )}
          name="step"
        />
        {errors?.step && (
          <Text className="text-rose-500 mt-2 text-sm">
            {errors.step.message}
          </Text>
        )}
        <Button
          color="black"
          disabled={isPending}
          onPress={handleSubmit(onSubmit)}
          title={isPending ? "Editando..." : "Editar"}
        />
      </View>
    </PageLayout>
  );
}
