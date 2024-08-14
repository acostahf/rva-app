import React, { useState } from "react";
import { View, Text, TextInput, Button, Switch, Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorScheme, setColorScheme } = useColorScheme();

  const updateEmail = async () => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Email updated successfully");
    }
  };

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Password updated successfully");
    }
  };

  const toggleDarkMode = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <GestureHandlerRootView className="flex-1 justify-center items-center p-4 bg-white dark:bg-black">
      <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">Account Settings</Text>
      
      <View className="mt-4 w-full">
        <Text className="text-gray-900 dark:text-gray-100">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your new email"
          className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Update Email" onPress={updateEmail} />
      </View>

      <View className="mt-4 w-full">
        <Text className="text-gray-900 dark:text-gray-100">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your new password"
          className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
          secureTextEntry
        />
        <Button title="Update Password" onPress={updatePassword} />
      </View>

      <View className="mt-4 w-full flex-row justify-between items-center">
        <Text className="text-gray-900 dark:text-gray-100">Dark Mode</Text>
        <Switch value={colorScheme === "dark"} onValueChange={toggleDarkMode} />
      </View>
    </GestureHandlerRootView>
  );
}
