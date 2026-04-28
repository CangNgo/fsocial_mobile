import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const isLoggedIn = false;

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [isLoggedIn, segments]);

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    // <AnimatedSplashOverlay />
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
      <Stack.Screen name="index" />
    </Stack>
    // </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
