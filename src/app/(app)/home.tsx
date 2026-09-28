import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import Screen from "../../primitives/Screen";
import Container from "../../primitives/Container";
import Column from "../../primitives/Column";
import Row from "../../primitives/Row";
import Spacer from "../../primitives/Spacer";

import AppAvatar from "../../components/AppAvatar";
import AppCard from "../../components/AppCard";
//import AppHeader from "../../components/AppHeader";
import AppIcon from "../../components/AppIcon";
import AppText from "../../components/AppText";
import AppBottom from "@/components/AppBottom";

import { useAppSelector } from "../../redux/hooks";

import theme from "../../theme";

export default function HomeScreen() {
  const router = useRouter();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const attendanceRate = useAppSelector(
    (state) => state.attendance.rate
  );

  if (!user) {
    return (
      <Screen>
        <Container>
          <AppText>
            No user found.
          </AppText>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* <AppHeader
        title="Home"
        rightIcon="bell-outline"
      /> */}

      <Container style={styles.container}>
        <Column gap="lg">

          {/* Welcome */}
          <Row
            justify="space-between"
            align="center"
          >
            <Column
              gap="xs"
              style={styles.welcome}
            >
              <AppText
                size="sm"
                color={theme.colors.textSecondary}
              >
                Welcome back
              </AppText>

              <AppText
                size="xxl"
                weight="bold"
              >
                {user.name}
              </AppText>

              {/* <AppText
                size="sm"
                color={theme.colors.textSecondary}
              >
                {user.batch ?? "SHARP Programme"}
              </AppText> */}
            </Column>

            {/* <AppAvatar
              initials={user.initials}
              color={user.color}
              size={52}
            /> */}
          </Row>

          {/* <Spacer size="sm" /> */}

          {/* Attendance */}
          <AppCard>
            <Row
              justify="space-between"
              align="center"
            >
              <Column gap="xs">
                <AppText
                  size="lg"
                  weight="bold"
                >
                  My Attendance
                </AppText>

                <AppText
                  size="sm"
                  color={theme.colors.textSecondary}
                >
                  Overall attendance
                </AppText>
              </Column>

              <Column
                align="center"
                gap="xs"
              >
                <AppText
                  size="xxxl"
                  weight="bold"
                  color={theme.colors.primary}
                >
                  {attendanceRate}%
                </AppText>

                <AppText
                  size="xs"
                  color={theme.colors.textSecondary}
                >
                  Attendance
                </AppText>
              </Column>
            </Row>
          </AppCard>

          {/* Quick Actions */}
          <Column gap="md">

            <AppText
              size="lg"
              weight="bold"
            >
              Quick Actions
            </AppText>

            <QuickAction
              icon="calendar-check-outline"
              title="My Attendance"
              description="View your attendance records"
              onPress={() =>
                router.push("/attendance")
              }
            />

            <QuickAction
              icon="forum-outline"
              title="Common Floor"
              description="Connect with the SHARP community"
              onPress={() =>
                router.push("/floor/common-floor")
              }
            />

            <QuickAction
              icon="account-group-outline"
              title="Members Directory"
              description="View SHARP programme members"
              onPress={() =>
                router.push(
                  "/(app)/people"
                )
              }
            />

          </Column>

          {/* Student Information */}
          {/* <AppCard>
            <Column gap="sm">

              <AppText
                size="lg"
                weight="bold"
              >
                Programme
              </AppText>

              <View style={styles.divider} />

              <InfoRow
                label="College"
                value={user.org ?? "-"}
              />

              <InfoRow
                label="Batch"
                value={user.batch ?? "-"}
              />

              <InfoRow
                label="Student ID"
                value={user.id}
              />

            </Column>
          </AppCard> */}

        </Column>
      </Container>

      <AppBottom />
    </Screen>
  );
}

type QuickActionProps = {
  icon: React.ComponentProps<
    typeof AppIcon
  >["name"];
  title: string;
  description: string;
  onPress: () => void;
};

function QuickAction({
  icon,
  title,
  description,
  onPress,
}: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickAction,
        pressed && styles.quickActionPressed,
      ]}
    >
      <View style={styles.actionIcon}>
        <AppIcon
          name={icon}
          size={25}
          color={theme.colors.primary}
        />
      </View>

      <Column
        gap="xs"
        style={styles.actionContent}
      >
        <AppText
          size="md"
          weight="semibold"
        >
          {title}
        </AppText>

        <AppText
          size="sm"
          color={theme.colors.textSecondary}
        >
          {description}
        </AppText>
      </Column>

      <AppIcon
        name="chevron-right"
        size={22}
        color={theme.colors.textSecondary}
      />
    </Pressable>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <Row justify="space-between">
      <AppText
        size="sm"
        color={theme.colors.textSecondary}
      >
        {label}
      </AppText>

      <AppText
        size="sm"
        weight="semibold"
        align="right"
        style={styles.value}
      >
        {value}
      </AppText>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.lg,
  },

  welcome: {
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },

  value: {
    flex: 1,
    marginLeft: theme.spacing.lg,
  },

  quickAction: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
   // borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  quickActionPressed: {
    opacity: 0.7,
  },

  actionIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
  },

  actionContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
});

