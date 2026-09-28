import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import AppText from "./AppText";
import theme from "../theme";

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function AppInput({
  label,
  error,
  style,
  ...props
}: AppInputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <AppText
          size="sm"
          weight="semibold"
          color={theme.colors.text}
          style={styles.label}
        >
          {label}
        </AppText>
      )}

      <TextInput
        {...props}
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={theme.colors.textLight}
      />

      {error && (
        <AppText
          size="xs"
          color={theme.colors.error}
          style={styles.error}
        >
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    marginBottom: theme.spacing.sm,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },

  inputError: {
    borderColor: theme.colors.error,
  },

  error: {
    marginTop: theme.spacing.xs,
  },
});

