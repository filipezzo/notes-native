import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function Header({ showArrow }) {
  return (
    <View className="flex-row items-center justify-between gap-10">
      {showArrow ? (
        <Link href="/" asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </Link>
      ) : (
        <Text className="text-xl text-black font-semibold  ">Notes</Text>
      )}

      <Link href="/notes" asChild>
        <Pressable>
          <Ionicons name="add-circle" size={24} color="black" />
        </Pressable>
      </Link>
    </View>
  );
}
