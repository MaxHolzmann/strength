import { Image, StyleSheet, Platform, Button, View, Text } from "react-native";
import "../../global.css";

async function fetchHello() {
  const response = await fetch("/api/hello");
  const data = await response.json();
  alert("Hello " + data.hello);
}

export default function HomeScreen() {
  return (
    <View className="">
      <View className="text-center">
        <Text className="text-white text-6xl">Create a Workout</h1>
      </View>
      <Button onPress={() => fetchHello()} title="Fetch hello" />;
    </View>
  );
}
