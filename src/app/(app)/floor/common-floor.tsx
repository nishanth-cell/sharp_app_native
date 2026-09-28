import React, { useEffect } from "react";

import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import Screen from "../../../primitives/Screen";
import Container from "../../../primitives/Container";

import AppHeader from "../../../components/AppHeader";
import AppAvatar from "../../../components/AppAvatar";
import AppCard from "../../../components/AppCard";
import AppText from "../../../components/AppText";
import AppBottom from "../../../components/AppBottom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks";

import {
  setCommonFloor,
  setCommonFloorError,
  setCommonFloorLoading,
} from "../../../redux/slices/commonFloorSlice";

import { getCommonFloorApi } from "../../../services/commonFloorApi";

import theme from "../../../theme";

export default function CommonFloorScreen() {
  const dispatch = useAppDispatch();

  const token = useAppSelector(
    (state) => state.auth.token
  );

  const messages = useAppSelector(
    (state) => state.commonFloor.messages
  );

  const loading = useAppSelector(
    (state) => state.commonFloor.loading
  );

  useEffect(() => {
    loadMessages();
  }, [token]);

  const loadMessages = async () => {
    if (!token) return;

    try {
      dispatch(setCommonFloorLoading(true));

      const data =
        await getCommonFloorApi(token);

      if (data.ok) {
        dispatch(
          setCommonFloor(data.messages)
        );
      } else {
        dispatch(
          setCommonFloorError(
            "Unable to load common floor."
          )
        );
      }
    } catch (error) {
      console.log(
        "COMMON FLOOR LOAD ERROR:",
        error
      );

      dispatch(
        setCommonFloorError(
          "Unable to load common floor."
        )
      );
    }
  };

  return (
    <Screen>
      <AppHeader
        title="Common Floor"
        subtitle="Shared programme space"
      />

      <Container style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
          ListEmptyComponent={
            !loading ? (
              <AppText
                size="sm"
                color={
                  theme.colors.textSecondary
                }
                align="center"
              >
                {"No messages found."}
              </AppText>
            ) : null
          }
          renderItem={({ item }) => (
            <MessageCard message={item} />
          )}
        />
      </Container>

      <AppBottom />
    </Screen>
  );
}

type MessageCardProps = {
  message: {
    message: string;
    author_name: string;
    author_role: string;
    avatar_initials: string;
    avatar_color: string;
    created_at: string;
  };
};

function MessageCard({
  message,
}: MessageCardProps) {
  return (
    <AppCard style={styles.messageCard}>
      <View style={styles.authorRow}>
        <AppAvatar
          initials={message.avatar_initials}
          color={message.avatar_color}
        />

        <View style={styles.authorInfo}>
          <AppText
            size="md"
            weight="semibold"
          >
            {message.author_name}
          </AppText>

          <AppText
            size="xs"
            color={theme.colors.primary}
          >
            {formatRole(message.author_role)}
          </AppText>
        </View>
      </View>

      <AppText
        size="sm"
        color={theme.colors.text}
        style={styles.message}
      >
        {message.message}
      </AppText>

      <AppText
        size="xs"
        color={theme.colors.textLight}
      >
        {formatDate(message.created_at)}
      </AppText>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.md,
  },

  listContent: {
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  messageCard: {
    padding: theme.spacing.md,
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  authorInfo: {
    flex: 1,
    gap: 2,
  },

  message: {
    marginTop: theme.spacing.md,
    lineHeight: 22,
  },
});