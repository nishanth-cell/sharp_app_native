import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Screen from "../../../primitives/Screen";
import Container from "../../../primitives/Container";

import AppHeader from "../../../components/AppHeader";
import AppAvatar from "../../../components/AppAvatar";
import AppCard from "../../../components/AppCard";
import AppText from "../../../components/AppText";
import AppInput from "../../../components/AppInput";
import AppIcon from "../../../components/AppIcon";
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

import {
  getCommonFloorApi,
  sendCommonFloorApi,
} from "../../../services/commonFloorApi";

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

 const [message, setMessage] = useState("");

const flatListRef = useRef<FlatList>(null);

useEffect(() => {
  if (!messages.length) return;

  const timer = setTimeout(() => {
    flatListRef.current?.scrollToEnd({
      animated: false,
    });
  }, 150);

  return () => clearTimeout(timer);
}, [messages]);

  useEffect(() => {
    loadMessages();
  }, [token]);

  const loadMessages = async () => {
    if (!token) return;

    try {
      dispatch(setCommonFloorLoading(true));

      const data = await getCommonFloorApi(token);

      if (data.ok) {
        dispatch(setCommonFloor(data.messages));
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

const handleSendMessage = async () => {
  const trimmedMessage = message.trim();

  if (!trimmedMessage || !token) {
    return;
  }

  try {
    const data = await sendCommonFloorApi(
      token,
      trimmedMessage
    );

    console.log(
      "SEND MESSAGE RESPONSE:",
      data
    );

    if (data.ok) {
      setMessage("");

      // Reload messages so the new message appears
      await loadMessages();
    }
  } catch (error: any) {
    console.log(
      "SEND MESSAGE ERROR:",
      error?.response?.data || error
    );
  }
};

  return (
    <Screen>
      <AppHeader
        title="Common Floor"
        subtitle="Shared programme space"
      />

      <KeyboardAvoidingView
  style={styles.keyboardContainer}
  behavior={
    Platform.OS === "ios"
      ? "padding"
      : "height"
  }
>
  <Container style={styles.container}>
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) =>
        item.id.toString()
      }
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={
        styles.listContent
      }
      style={styles.messageList}
      renderItem={({ item }) => (
        <MessageCard message={item} />
      )}
    />

    <View style={styles.inputBar}>
      <View style={styles.inputWrapper}>
        <AppInput
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message..."
          multiline
          style={styles.input}
          onFocus={() => {
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({
                animated: true,
              });
            }, 250);
          }}
        />
      </View>

      <Pressable
        onPress={handleSendMessage}
        disabled={!message.trim()}
        style={[
          styles.sendButton,
          !message.trim() &&
            styles.sendButtonDisabled,
        ]}
      >
        <AppIcon
          name="send"
          size={20}
          color={theme.colors.surface}
        />
      </Pressable>
    </View>
  </Container>
</KeyboardAvoidingView>

      <AppBottom />
    </Screen>
  );
}

type MessageCardProps = {
  message: {
    id: number;
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
  keyboardContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  messageList: {
    flex: 1,
  },

  listContent: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
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

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",

    gap: theme.spacing.sm,

    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,

    backgroundColor: theme.colors.surface,

    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },

  inputWrapper: {
    flex: 1,
  },

  input: {
    minHeight: 44,
    maxHeight: 110,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.colors.primary,
  },

  sendButtonDisabled: {
    opacity: 0.45,
  },
});