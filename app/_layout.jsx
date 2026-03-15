import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#000000");
  }, []);

  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },

          // 🔥 Faster & smoother
          animation: "slide_from_right",
          animationDuration: 10, // default ~300, now faster
          gestureEnabled: true,
          gestureResponseDistance: 25,
        }}
      />
    </>
  );
}