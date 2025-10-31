// components/GlobalText.js
import React from "react";
import { Text as RNText } from "react-native";

export default function Text({ style, ...props }) {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: "Inter_400Regular", color: "#000" }, style]}
    />
  );
}
