import React, { useState } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import Screen from "../../../primitives/Screen";
import Container from "../../../primitives/Container";
import Column from "../../..//primitives/Column";

import AppHeader from "../../../components/AppHeader";
import AppAvatar from "../../../components/AppAvatar";
import AppCard from "../../../components/AppCard";
import AppIcon from "../../../components/AppIcon";
import AppText from "../../../components/AppText";
import AppBottom from "../../../components/AppBottom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks";

import { logout } from "../../../redux/slices/authSlice";

import { api } from "../../../../src/services/api";

import theme from "../../../theme";

export default function MoreScreen() {
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
        "SIGN OUT: calling logout API"
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
      <AppHeader title="More" />

      <Container style={styles.container}>
        <Column gap="md">

          {/* User Header */}
          {user && (
            <AppCard style={styles.userCard}>
              <View style={styles.userRow}>
                <AppAvatar
                  initials={user.initials}
                  color={user.color}
                />

                <View style={styles.userInfo}>
                  <AppText
                    size="lg"
                    weight="bold"
                  >
                    {user.name}
                  </AppText>

                  <AppText
                    size="sm"
                    color={theme.colors.textSecondary}
                  >
                    {user.org ?? ""}
                  </AppText>

                  {/* <AppText
                    size="xs"
                    color={theme.colors.primary}
                  >
                    {user.batch ?? "Student"}
                  </AppText> */}
                </View>
              </View>
            </AppCard>
          )}

          {/* Profile */}
          <MoreItem
            icon="account-outline"
            title="Profile"
            subtitle="View your profile"
            onPress={() =>
              router.push("/more/profile")
            }
          />

          {/* Members Directory */}
          <MoreItem
            icon="account-group-outline"
            title="Members Directory"
            subtitle="View programme members"
            onPress={() =>
              router.push(
                "/(app)/people"
              )
            }
          />

          {/* Common Floor */}
          <MoreItem
            icon="forum-outline"
            title="Common Floor"
            subtitle="View the shared programme space"
            onPress={() =>
              router.push(
                "/floor/common-floor"
              )
            }
          />

          {/* Sign Out */}
          <Pressable
            onPress={handleSignOut}
            disabled={signingOut}
            style={styles.signOutButton}
          >
            <View style={styles.signOutIcon}>
              <AppIcon
                name="logout"
                size={24}
                color={theme.colors.error}
              />
            </View>

            <View style={styles.signOutContent}>
              <AppText
                size="md"
                weight="semibold"
                color={theme.colors.error}
              >
                {signingOut
                  ? "Signing Out..."
                  : "Sign Out"}
              </AppText>

              <AppText
                size="xs"
                color={theme.colors.textSecondary}
              >
                {"Sign out of your account"}
              </AppText>
            </View>
          </Pressable>

        </Column>
      </Container>

      <AppBottom />
    </Screen>
  );
}

type MoreItemProps = {
  icon: React.ComponentProps<
    typeof AppIcon
  >["name"];
  title: string;
  subtitle: string;
  onPress: () => void;
};

function MoreItem({
  icon,
  title,
  subtitle,
  onPress,
}: MoreItemProps) {
  return (
    <Pressable onPress={onPress}>
      <AppCard style={styles.itemCard}>
        <View style={styles.itemRow}>
          <View style={styles.iconContainer}>
            <AppIcon
              name={icon}
              size={24}
              color={theme.colors.primary}
            />
          </View>

          <View style={styles.itemContent}>
            <AppText
              size="md"
              weight="semibold"
            >
              {title}
            </AppText>

            <AppText
              size="xs"
              color={theme.colors.textSecondary}
            >
              {subtitle}
            </AppText>
          </View>

          <AppIcon
            name="chevron-right"
            size={22}
            color={theme.colors.textSecondary}
          />
        </View>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.md,
  },

  userCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primaryLight,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  userInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },

  itemCard: {
    padding: theme.spacing.md,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
  },

  itemContent: {
    flex: 1,
    gap: 2,
  },

  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.surface,
  },

  signOutIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
  },

  signOutContent: {
    flex: 1,
    gap: 2,
  },
});