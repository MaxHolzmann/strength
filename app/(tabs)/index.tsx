import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  Text,
  SafeAreaView,
  Pressable,
} from "react-native";
import "../../global.css";
import { authorize } from "react-native-app-auth";
// import authConfig from "../../auth/authConfig";

import { Config } from "react-native-config";

const GOOGLE_OAUTH_APP_GUID = Config.GOOGLE_OAUTH_APP_GUID;

console.log(GOOGLE_OAUTH_APP_GUID);

const authConfig = {
  issuer: "https://accounts.google.com",
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ["openid", "profile"],
};

async function fetchHello() {
  const response = await fetch("/api/hello");
  const data = await response.json();
  alert("Hello " + data.hello);
}

export default function HomeScreen() {
  console.log("Google: ", GOOGLE_OAUTH_APP_GUID);
  console.log(authConfig);
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="">
        <View className="text-center">
          <Text className="text-6xl">Create a Workout</Text>
        </View>
        <Button onPress={() => fetchHello()} title="Fetch hello" />
      </View>
      <View>
        <Pressable onPress={() => authorize(authConfig)}>
          <Text className="text-xl">Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
