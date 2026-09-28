
import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import theme from "../theme";

type ContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: keyof typeof theme.spacing;
};

export default function Container({
  children,
  style,
  padding = "lg",
}: ContainerProps) {
  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing[padding],
          
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

