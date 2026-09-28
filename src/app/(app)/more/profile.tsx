import React, { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import Screen from "../../../primitives/Screen";
import Container from "../../../primitives/Container";
import Column from "../../../primitives/Column";

import AppHeader from "../../../components/AppHeader";
import AppAvatar from "../../../components/AppAvatar";
import AppCard from "../../../components/AppCard";
import AppIcon from "../../../components/AppIcon";
import AppText from "../../../components/AppText";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks";

import { logout } from "../../../redux/slices/authSlice";

import { api } from "../../../services/api";

import theme from "../../../theme";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const token = useAppSelector(
    (state) => state.auth.token
  );

  const [signingOut, setSigningOut] =
    useState(false);

  if (!user) {
    return (
      <Screen>
        <AppHeader
          title="Profile"
          onBack={() => router.back()}
        />

        <Container>
          <AppText>
            {"User details not available."}
          </AppText>
        </Container>
      </Screen>
    );
  }

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: signOut,
        },
      ]
    );
  };

  const signOut = async () => {
    if (signingOut) return;

    try {
      setSigningOut(true);

      console.log(
        "PROFILE SIGN OUT: calling logout API"
      );

      if (token) {
        const response = await api.post(
          "/auth/logout.php",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "LOGOUT RESPONSE:",
          response.data
        );
      }
    } catch (error: any) {
      console.log(
        "LOGOUT ERROR:",
        error?.response?.data || error
      );
    } finally {
      dispatch(logout());
      setSigningOut(false);

      router.replace("/login");
    }
  };

  return (
    <Screen>
      <AppHeader
        title="Profile"
        onBack={() => router.back()}
      />

      <ScrollView>

      <Container style={styles.container}>
        <Column gap="lg">

          {/* User Header */}
          <AppCard style={styles.profileHeader}>
            <View style={styles.profileHeaderContent}>
              <AppAvatar
                initials={user.initials}
                color={user.color}
              />

              <View style={styles.headerInfo}>
                <AppText
                  size="xl"
                  weight="bold"
                >
                  {user.name}
                </AppText>

                <AppText
                  size="sm"
                  color={theme.colors.primary}
                >
                  {"Student"}
                </AppText>

                <AppText
                  size="xs"
                  color={theme.colors.textSecondary}
                >
                  {user.username}
                </AppText>
              </View>
            </View>
          </AppCard>

          {/* Personal Details */}
          <ProfileSection title="Personal Details">
            <ProfileRow
              icon="card-account-details-outline"
              label="Student ID"
              value={user.id}
            />

            <ProfileRow
              icon="account-outline"
              label="Username"
              value={user.username}
            />

            <ProfileRow
              icon="phone-outline"
              label="Mobile"
              value={user.mobile ?? "Not available"}
            />

            <ProfileRow
              icon="email-outline"
              label="Email"
              value={user.email ?? "Not available"}
            />
          </ProfileSection>

          {/* Programme Details */}
          <ProfileSection title="Programme Details">
            <ProfileRow
              icon="school-outline"
              label="College"
              value={
                user.org ?? "Not available"
              }
            />

            <ProfileRow
              icon="book-outline"
              label="Batch"
              value={
                user.batch ?? "Not available"
              }
            />

            <ProfileRow
              icon="account-school-outline"
              label="Role"
              value="Student"
            />
          </ProfileSection>

          {/* Account Details */}
          <ProfileSection title="Account Details">
            <ProfileRow
              icon="check-circle-outline"
              label="Status"
              value={user.status}
            />

            <ProfileRow
              icon="calendar-outline"
              label="Joined"
              value={formatDate(
                user.created_at
              )}
            />

            <ProfileRow
              icon="login"
              label="Last Login"
              value={
                user.last_login
                  ? formatDateTime(
                      user.last_login
                    )
                  : "Not available"
              }
            />
          </ProfileSection>

          {/* Change Password */}
          <Pressable
            onPress={() =>
             router.push("/reset-password")
            }
          >
            <AppCard>
              <View style={styles.actionRow}>
                <View
                  style={styles.actionIcon}
                >
                  <AppIcon
                    name="lock-reset"
                    size={24}
                    color={
                      theme.colors.primary
                    }
                  />
                </View>

                <View style={styles.actionContent}>
                  <AppText
                    size="md"
                    weight="semibold"
                  >
                    {"Change Password"}
                  </AppText>

                  <AppText
                    size="xs"
                    color={
                      theme.colors.textSecondary
                    }
                  >
                    {
                      "Update your account password"
                    }
                  </AppText>
                </View>

                <AppIcon
                  name="chevron-right"
                  size={22}
                  color={
                    theme.colors.textSecondary
                  }
                />
              </View>
            </AppCard>
          </Pressable>

          {/* Sign Out */}
          <Pressable
            onPress={handleSignOut}
            disabled={signingOut}
            style={styles.signOut}
          >
            <AppIcon
              name="logout"
              size={24}
              color={theme.colors.error}
            />

            <AppText
              size="md"
              weight="semibold"
              color={theme.colors.error}
            >
              {signingOut
                ? "Signing Out..."
                : "Sign Out"}
            </AppText>
          </Pressable>

        </Column>
      </Container>
      </ScrollView>
    </Screen>
  );
}

type ProfileSectionProps = {
  title: string;
  children: React.ReactNode;
};

function ProfileSection({
  title,
  children,
}: ProfileSectionProps) {
  return (
    <Column gap="sm">
      <AppText
        size="lg"
        weight="bold"
      >
        {title}
      </AppText>

      <AppCard>
        <Column gap="md">
          {children}
        </Column>
      </AppCard>
    </Column>
  );
}

type ProfileRowProps = {
  icon: React.ComponentProps<
    typeof AppIcon
  >["name"];
  label: string;
  value: string;
};

function ProfileRow({
  icon,
  label,
  value,
}: ProfileRowProps) {
  return (
    <View style={styles.profileRow}>
      <View style={styles.rowIcon}>
        <AppIcon
          name={icon}
          size={21}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.rowContent}>
        <AppText
          size="xs"
          color={theme.colors.textSecondary}
        >
          {label}
        </AppText>

        <AppText
          size="sm"
          weight="medium"
        >
          {value}
        </AppText>
      </View>
    </View>
  );
}

function formatDate(date: string) {
  const parsedDate = new Date(
    date.replace(" ", "T")
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatDateTime(date: string) {
  const parsedDate = new Date(
    date.replace(" ", "T")
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxxl,
  },

  profileHeader: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primaryLight,
  },

  profileHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.lg,
  },

  headerInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
  },

  rowContent: {
    flex: 1,
    gap: 2,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
  },

  actionContent: {
    flex: 1,
    gap: 2,
  },

  signOut: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
  },
});