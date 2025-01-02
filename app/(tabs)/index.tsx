import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import "../../global.css";

async function fetchHello() {
  const response = await fetch("/api/hello");
  const data = await response.json();
  alert("Hello " + data.hello);
}

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="">
        <View className="text-center">
          <Text className="text-6xl">Create a Workout</Text>
        </View>
        <Button onPress={() => fetchHello()} title="Fetch hello" />;
      </View>
    </SafeAreaView>
  );
}
