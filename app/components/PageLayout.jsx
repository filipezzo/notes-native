import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

export default function PageLayout({ children, isHomepage = false }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <View className="flex-1  p-5 ">
        <Header showArrow={!isHomepage} />
        <View>{children}</View>
      </View>
    </SafeAreaView>
  );
}
