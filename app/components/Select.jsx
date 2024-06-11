import { Picker } from "@react-native-picker/picker";
import React from "react";

export function Select({ value, onValueChange }) {
  return (
    <Picker selectedValue={value} onValueChange={onValueChange}>
      <Picker.Item label="Para fazer" value="Para fazer" />
      <Picker.Item label="Em andamento" value="Em andamento" />
      <Picker.Item label="Pronto" value="Pronto" />
    </Picker>
  );
}
