import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import Toast from "react-native-toast-message";
const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="notes"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="edit"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Toast />
    </QueryClientProvider>
  );
}
