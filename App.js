// App.jsx

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

// Screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PasscodeScreen from "./screens/PasscodeScreen";
import SetPasscodeScreen from "./screens/SetPasscodeScreen";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import TrackerScreen from "./screens/TrackerScreen";
import SubjectsScreen from "./screens/SubjectsScreen";
import TimerScreen from "./screens/TimerScreen";
import { AppState } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Today") iconName = "home-outline";
          else if (route.name === "Calendar") iconName = "calendar-outline";
          else if (route.name === "Tracker") iconName = "stats-chart-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4a90e2",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Today" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Tracker" component={TrackerScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, isPasscodeSet, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : isPasscodeSet ? (
        <>
          <Stack.Screen name="Passcode" component={PasscodeScreen} />
          <Stack.Screen name="Subjects" component={SubjectsScreen} />
          <Stack.Screen name="MainApp" component={MainTabs} />
          <Stack.Screen name="Timer" component={TimerScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SetPasscode" component={SetPasscodeScreen} />
          <Stack.Screen name="Subjects" component={SubjectsScreen} />
          <Stack.Screen name="MainApp" component={MainTabs} />
          <Stack.Screen name="Timer" component={TimerScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </DataProvider>
    </AuthProvider>
  );
}
