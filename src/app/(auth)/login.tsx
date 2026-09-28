import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import Screen from "../../primitives/Screen";
import Container from "../../primitives/Container";
import Column from "../../primitives/Column";
import Spacer from "../../primitives/Spacer";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

import { loginApi } from "../../../src/services/authApi";

import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/slices/authSlice";

import { getAttendanceApi } from "../../../src/services/attendanceApi";

import {
  setAttendance,
  setAttendanceLoading,
  setAttendanceError,
} from "../../redux/slices/attendanceSlice";

import theme from "../../theme";

export default function LoginScreen() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert(
        "Login",
        "Please enter your username."
      );
      return;
    }

    if (!password) {
      Alert.alert(
        "Login",
        "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);

      const data = await loginApi(
        username.trim(),
        password
      );

      console.log("LOGIN RESPONSE:", data);

      if (!data.ok) {
        Alert.alert(
          "Login Failed",
          "Invalid username or password."
        );
        return;
      }

      // Store token + user in Redux
      dispatch(
        setCredentials({
          token: data.token,
          user: data.user,
        })
      );

      console.log(
        "REDUX LOGIN USER:",
        data.user
      );

      console.log(
        "REDUX LOGIN TOKEN:",
        data.token
      );

      // Student flow for now
      if (data.user.role === "student") {
         try {
    dispatch(setAttendanceLoading(true));

    const attendanceData =
      await getAttendanceApi(data.token);

    console.log(
      "ATTENDANCE RESPONSE:",
      attendanceData
    );

    if (attendanceData.ok) {
      dispatch(
        setAttendance({
          student: attendanceData.student,
          rate: attendanceData.rate,
          records: attendanceData.records,
        })
      );
    } else {
      dispatch(
        setAttendanceError(
          "Unable to load attendance."
        )
      );
    }
  } catch (error: any) {
    console.log(
      "ATTENDANCE ERROR:",
      error?.response?.data || error
    );

    dispatch(
      setAttendanceError(
        "Unable to load attendance."
      )
    );
  }
        router.replace("/home");
      }
    } catch (error: any) {
      console.log(
        "LOGIN ERROR:",
        error?.response?.data || error
      );

      Alert.alert(
        "Login Error",
        error?.response?.data?.message ||
          error?.message ||
          "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen keyboardAvoiding>
      <Container
        style={styles.container}
      >
        <Column
          gap="lg"
          style={styles.content}
        >
          <Column
            gap="sm"
            align="center"
          >
            <AppText
              size="xxxl"
              weight="bold"
              color={theme.colors.primary}
              align="center"
            >
              SHARP
            </AppText>

            <AppText
              size="sm"
              color={theme.colors.textSecondary}
              align="center"
            >
              TNCCI Programme
            </AppText>
          </Column>

          <Spacer size="lg" />

          <Column gap="md">
            <AppText
              size="xxl"
              weight="bold"
            >
              Welcome Back
            </AppText>

            <AppInput
              label="Username"
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <AppInput
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Spacer size="sm" />

            <AppButton
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
            />

            {/* <AppButton
              title="Forgot Password?"
              variant="outline"
              onPress={() =>
                router.push("/reset-password")
              }
            /> */}
          </Column>
        </Column>
      </Container>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  content: {
    width: "100%",
  },
});
