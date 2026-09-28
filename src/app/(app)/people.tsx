import React, {
  useEffect,
  useState,
} from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Screen from "../../primitives/Screen";
import Container from "../../primitives/Container";

import AppHeader from "../../components/AppHeader";
import AppInput from "../../components/AppInput";
import AppText from "../../components/AppText";
import AppAvatar from "../../components/AppAvatar";
import AppCard from "../../components/AppCard";
import AppBottom from "../../components/AppBottom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";

import {
  setPeople,
  setPeopleError,
  setPeopleLoading,
} from "../../redux/slices/peopleSlice";

import { getPeopleApi } from "../../../src/services/peopleApi";

import theme from "../../theme";

const roleFilters = [
  "All",
  "Student",
  "Mentor",
  "Trainer",
  "Member",
  "Admin",
];

export default function PeopleScreen() {
  const dispatch = useAppDispatch();

  const token = useAppSelector(
    (state) => state.auth.token
  );

  const users = useAppSelector(
    (state) => state.people.users
  );

  const loading = useAppSelector(
    (state) => state.people.loading
  );

  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] =
    useState("All");

  useEffect(() => {
    loadPeople();
  }, [token, selectedRole]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPeople();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const loadPeople = async () => {
    if (!token) return;

    try {
      dispatch(setPeopleLoading(true));

      console.log("");
      console.log("========== LOAD PEOPLE ==========");
      console.log("Selected Role:", selectedRole);
      console.log("Search:", search);

      const data = await getPeopleApi(
        token,
        selectedRole,
        search
      );

      console.log("PEOPLE DATA:", data);

      if (data.ok) {
        console.log(
          "PEOPLE COUNT:",
          data.users?.length ?? 0
        );

        dispatch(setPeople(data.users));
      } else {
        console.log(
          "PEOPLE API RETURNED ok=false"
        );

        dispatch(
          setPeopleError(
            "Unable to load people."
          )
        );
      }
    } catch (error) {
      console.log(
        "PEOPLE LOAD ERROR:",
        error
      );

      dispatch(
        setPeopleError(
          "Unable to load people."
        )
      );
    }
  };

  return (
    <Screen>
      <AppHeader title="People" />

      <Container style={styles.container}>
        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search people..."
        />

        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            data={roleFilters}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.filterContent
            }
            renderItem={({ item }) => {
              const active =
                selectedRole === item;

              return (
                <Pressable
                  onPress={() =>
                    setSelectedRole(item)
                  }
                  style={[
                    styles.filter,
                    active &&
                      styles.activeFilter,
                  ]}
                >
                  <AppText
                    size="sm"
                    weight={
                      active
                        ? "semibold"
                        : "regular"
                    }
                    color={
                      active
                        ? theme.colors.white
                        : theme.colors.textSecondary
                    }
                  >
                    {item}
                  </AppText>
                </Pressable>
              );
            }}
          />
        </View>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
          ListEmptyComponent={
            !loading ? (
              <AppText
                size="sm"
                color={theme.colors.textSecondary}
                align="center"
              >
                {"No people found."}
              </AppText>
            ) : null
          }
          renderItem={({ item }) => (
            <PersonCard person={item} />
          )}
        />
      </Container>

      <AppBottom />
    </Screen>
  );
}

type PersonCardProps = {
  person: {
    name: string;
    role: string;
    org: string | null;
    batch: string | null;
    initials: string;
    color: string;
    status: string;
  };
};

function PersonCard({
  person,
}: PersonCardProps) {
  return (
    <AppCard style={styles.personCard}>
      <View style={styles.personRow}>
        <AppAvatar
          initials={person.initials}
          color={person.color}
        />

        <View style={styles.personInfo}>
          <AppText
            size="md"
            weight="semibold"
            numberOfLines={1}
          >
            {person.name}
          </AppText>

          <AppText
            size="sm"
            color={theme.colors.primary}
          >
            {formatRole(person.role)}
          </AppText>

          {person.org ? (
            <AppText
              size="sm"
              color={theme.colors.textSecondary}
              numberOfLines={1}
            >
              {person.org}
            </AppText>
          ) : null}

          {person.batch ? (
            <AppText
              size="xs"
              color={theme.colors.textLight}
            >
              {person.batch}
            </AppText>
          ) : null}
        </View>
      </View>
    </AppCard>
  );
}

function formatRole(role: string) {
  return role
    .replace("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.md,
  },

  filterContainer: {
    marginTop: theme.spacing.md,
  },

  filterContent: {
    gap: theme.spacing.sm,
  },

  filter: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
  },

  activeFilter: {
    backgroundColor: theme.colors.primary,
  },

  listContent: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  personCard: {
    padding: theme.spacing.md,
  },

  personRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  personInfo: {
    flex: 1,
    gap: 2,
  },
});