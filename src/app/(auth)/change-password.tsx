import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import Screen from "../../primitives/Screen";
import Container from "../../primitives/Container";
import Column from "../../primitives/Column";
import Spacer from "../../primitives/Spacer";

import AppHeader from "../../components/AppHeader";
import AppCard from "../../components/AppCard";
import AppIcon from "../../components/AppIcon";
import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

import { useAppSelector } from "../../redux/hooks";

import { changePasswordApi } from "../../services/authApi";

import theme from "../../theme";

export default function ChangePasswordScreen() {
  const router = useRouter();

  const token = useAppSelector(
    (state) => state.auth.token
  );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword.trim()) {
      Alert.alert(
        "Change Password",
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert(
        "Change Password",
        "Please enter your new password."
      );
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert(
        "Change Password",
        "New password must be at least 8 characters."
      );
      return;
    }

    if (!confirmPassword.trim()) {
      Alert.alert(
        "Change Password",
        "Please confirm your new password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Change Password",
        "New passwords do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert(
        "Change Password",
        "New password must be different from your current password."
      );
      return;
    }

    if (!token) {
      Alert.alert(
        "Session Expired",
        "Please sign in again."
      );

      router.replace("/(auth)/login");
      return;
    }

    try {
      setLoading(true);

      const data = await changePasswordApi(
        token,
        currentPassword,
        newPassword
      );

      console.log(
        "CHANGE PASSWORD RESPONSE:",
        data
      );

      if (!data.ok) {
        Alert.alert(
          "Change Password Failed",
          data.message ||
            "Unable to change your password."
        );
        return;
      }

      Alert.alert(
        "Password Changed",
        "Your password has been changed successfully.",
        [
          {
            text: "Continue",
            onPress: () => {
              router.replace("/(app)/home");
            },
          },
        ]
      );
    } catch (error: any) {
      console.log(
        "CHANGE PASSWORD ERROR:",
        error?.response?.data || error
      );

      Alert.alert(
        "Change Password Failed",
        error?.response?.data?.message ||
          error?.message ||
          "Unable to change your password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen keyboardAvoiding>
      <AppHeader
        title="Change Password"
        onBack={() => router.back()}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Container style={styles.container}>
          <Column gap="lg">

            {/* Header */}
            <AppCard style={styles.introCard}>
              <View style={styles.introContent}>
                <View style={styles.iconContainer}>
                  <AppIcon
                    name="lock-reset"
                    size={28}
                    color={theme.colors.primary}
                  />
                </View>

                <View style={styles.introText}>
                  <AppText
                    size="xl"
                    weight="bold"
                  >
                    Change Your Password
                  </AppText>

                  <Spacer size="xs" />

                  <AppText
                    size="sm"
                    color={
                      theme.colors.textSecondary
                    }
                  >
                    Update your account password
                    securely. Enter your current
                    password and choose a new one.
                  </AppText>
                </View>
              </View>
            </AppCard>

            {/* Password Form */}
            <Column gap="sm">
              <AppText
                size="lg"
                weight="bold"
              >
                Password Details
              </AppText>

              <AppCard>
                <Column gap="md">

                  {/* Current Password */}
                  <AppInput
                    label="Current Password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChangeText={
                      setCurrentPassword
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  {/* New Password */}
                  <AppInput
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <View
                    style={styles.requirementRow}
                  >
                    <AppIcon
                      name="information-outline"
                      size={18}
                      color={
                        theme.colors.textSecondary
                      }
                    />

                    <AppText
                      size="xs"
                      color={
                        theme.colors.textSecondary
                      }
                    >
                      At least 8 characters
                    </AppText>
                  </View>

                  {/* Confirm Password */}
                  <AppInput
                    label="Confirm New Password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChangeText={
                      setConfirmPassword
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Spacer size="sm" />

                  <AppButton
                    title="Save New Password"
                    onPress={
                      handleChangePassword
                    }
                    loading={loading}
                  />

                </Column>
              </AppCard>
            </Column>

          </Column>
        </Container>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxxl,
  },

  introCard: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primaryLight,
  },

  introContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.md,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
  },

  introText: {
    flex: 1,
  },

  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
});
