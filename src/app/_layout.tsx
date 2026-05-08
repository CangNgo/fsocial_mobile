import { useAuthStore } from "@/features/auth/store/auth-store";
import { useNotifications } from "@/hooks/use-notifications";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function Layout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const [isRestoring, setIsRestoring] = useState(true);



  useEffect(() => {
    restoreSession().finally(() => setIsRestoring(false));
  }, []);

  useEffect(() => {
    if (isRestoring) return;
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)/home");
    }
  }, [isRestoring, isAuthenticated]);

  //register notification 
  useNotifications({
    userId: user?.id ? String(user.id) : null,
    onNotificationTap: (data) => {
      console.log("Custom handle tab: ", data)
      if (data?.screen) {
        router.push(data.screen as any);
      }
    }
  })

  return (
    <KeyboardProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Haven",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
