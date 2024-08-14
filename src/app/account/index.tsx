import React, { useState } from "react";
import { View, Text, TextInput, Button, Switch, Alert, Pressable } from "react-native";
import { supabase } from "@/lib/supabase";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [presetName, setPresetName] = useState("");
  const [fee, setFee] = useState("");
  const [shippingBySeller, setShippingBySeller] = useState(false);
  const [promoted, setPromoted] = useState("");
  const [tax, setTax] = useState("");
  const [margin, setMargin] = useState("");
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

  const createPreset = async () => {
    const { error } = await supabase
      .from("presets")
      .insert([
        {
          name: presetName,
          fee: parseInt(fee, 10),
          shipping_by_seller: shippingBySeller,
          promoted: parseInt(promoted, 10),
          tax: parseFloat(tax),
          margin: parseFloat(margin),
        },
      ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Preset created successfully");
      // Reset form after submission
      setPresetName("");
      setFee("");
      setShippingBySeller(false);
      setPromoted("");
      setTax("");
      setMargin("");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        className={`w-full h-full p-4 pt-20 flex flex-col gap-4 ${
          colorScheme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Settings</Text>
          <Pressable
            className="border-indigo-500 border-2 border-solid rounded-full px-2"
            onPress={toggleDarkMode}
          >
            <Text className="text-gray-900 dark:text-gray-100">
              {colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
            </Text>
          </Pressable>
        </View>

        <View className="flex flex-col gap-4 mt-4">
          <View>
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">Email</Text>
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

          <View>
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your new password"
              className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
              secureTextEntry
            />
            <Button title="Update Password" onPress={updatePassword} />
          </View>
        </View>

        <View className="flex flex-col gap-4 mt-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Preset</Text>

          <TextInput
            value={presetName}
            onChangeText={setPresetName}
            placeholder="Preset Name"
            className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
          />

          <TextInput
            value={fee}
            onChangeText={setFee}
            placeholder="Fee"
            className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
            keyboardType="numeric"
          />

          <View className="flex flex-row justify-between items-center mt-2">
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">Shipping by Seller</Text>
            <Switch value={shippingBySeller} onValueChange={setShippingBySeller} />
          </View>

          <TextInput
            value={promoted}
            onChangeText={setPromoted}
            placeholder="Promoted"
            className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
            keyboardType="numeric"
          />

          <TextInput
            value={tax}
            onChangeText={setTax}
            placeholder="Tax %"
            className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
            keyboardType="numeric"
          />

          <TextInput
            value={margin}
            onChangeText={setMargin}
            placeholder="User Margin"
            className="border border-gray-300 dark:border-gray-700 rounded p-2 mt-2"
            keyboardType="numeric"
          />

          <Button title="Create Preset" onPress={createPreset} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
