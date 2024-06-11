import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import { z } from "zod";
import PageLayout from "./components/PageLayout";
import { Select } from "./components/Select";
import { useCreateTask } from "./hooks/useCreateTask";

const taskSchema = z.object({
  title: z.string().min(1, "O título não pode ficar vazio"),
  description: z.string().min(5, "No minimo 5 caracteres."),
  step: z.enum(
    ["Em andamento", "Para fazer", "Pronto"],
    "Selecione a opção correta"
  ),
});

export default function Notes() {
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
    const newTask = {
      title,
      description,
      step,
    };
    await mutateAsync(newTask);
  };
  return (
    <PageLayout>
      <View className="mt-5 p-5  ">
        <Text className="text-2xl font-bold">Criar tarefa</Text>
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
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          title={isPending ? "Criando" : "Criar"}
        />
      </View>
    </PageLayout>
  );
}
