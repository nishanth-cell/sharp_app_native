import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  Href,
  usePathname,
  useRouter,
} from "expo-router";

import AppIcon from "./AppIcon";
import AppText from "./AppText";
import theme from "../theme";

type BottomItem = {
  label: string;
  icon: React.ComponentProps<typeof AppIcon>["name"];
  route: Href;
};

const items: BottomItem[] = [
  {
    label: "Home",
    icon: "home-outline",
    route: "/home",
  },
  {
    label: "Attendance",
    icon: "calendar-check-outline",
    route: "/attendance",
  },
  {
    label: "People",
    icon: "account-group-outline",
    route: "/people",
  },
  {
    label: "Floor",
    icon: "floor-plan",
    route: "/(app)/floor/common-floor",
  },
  {
    label: "More",
    icon: "dots-horizontal",
    route: "/more",
  },
];

export default function AppBottom() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    
    <View style={styles.container}>
      {items.map((item) => {
        const active = pathname === item.route;

        return (
          <Pressable
            key={item.route.toString()}
            onPress={() => router.replace(item.route)}
            style={styles.item}
          >
            <View
              style={[
                styles.iconContainer,
                active && styles.activeIconContainer,
              ]}
            >
              <AppIcon
                name={item.icon}
                size={23}
                color={
                  active
                    ? theme.colors.primary
                    : theme.colors.textSecondary
                }
              />
            </View>

            <AppText
              size="xs"
              weight={active ? "semibold" : "regular"}
              color={
                active
                  ? theme.colors.primary
                  : theme.colors.textSecondary
              }
            >
              {item.label}
            </AppText>
          </Pressable>
        );
      })}

    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  iconContainer: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },

  activeIconContainer: {
    backgroundColor: theme.colors.secondary,
  },
});