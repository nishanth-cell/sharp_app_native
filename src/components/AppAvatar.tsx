import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import AppText from "./AppText";
import theme from "../theme";

type AppAvatarProps = {
  initials?: string;
  color?: string;
  size?: number;
  style?: ViewStyle;
};

export default function AppAvatar({
  initials = "?",
  color = theme.colors.primary,
  size = 44,
  style,
}: AppAvatarProps) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    >
      <AppText
        size={size >= 52 ? "lg" : "md"}
        weight="bold"
        color={theme.colors.white}
        align="center"
      >
        {initials}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
});

