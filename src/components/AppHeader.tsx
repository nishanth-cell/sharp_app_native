import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import AppIcon from "./AppIcon";
import AppText from "./AppText";
import theme from "../theme";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightIcon?: React.ComponentProps<
    typeof AppIcon
  >["name"];
  onRightPress?: () => void;
};

export default function AppHeader({
  title,
  subtitle,
  onBack,
  rightIcon,
  onRightPress,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBack && (
          <Pressable
            onPress={onBack}
            style={styles.iconButton}
          >
            <AppIcon
              name="arrow-left"
              size={24}
              color={theme.colors.text}
            />
          </Pressable>
        )}

        <View style={styles.titleContainer}>
          <AppText
            size="lg"
            weight="bold"
            numberOfLines={1}
          >
            {title}
          </AppText>

          {subtitle && (
            <AppText
              size="xs"
              color={theme.colors.textSecondary}
              numberOfLines={1}
            >
              {subtitle}
            </AppText>
          )}
        </View>
      </View>

      {rightIcon && (
        <Pressable
          onPress={onRightPress}
          style={styles.iconButton}
        >
          <AppIcon
            name={rightIcon}
            size={24}
            color={theme.colors.text}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
  },

  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

