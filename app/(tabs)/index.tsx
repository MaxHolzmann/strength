import React from "react";
import { Button, SafeAreaView, Text, View, Pressable } from "react-native";
import * as AuthSession from "expo-auth-session";

// OAuth Discovery Document for Google
const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

const clientId = process.env.EXPO_PUBLIC_GOOGLE_ID;
const redirectUri = "http://localhost:8081";

export default function HomeScreen() {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      scopes: ["openid", "profile", "email"],
      responseType: AuthSession.ResponseType.Code,
      codeChallengeMethod: "S256",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const fetchToken = async () => {
        try {
          const tokenResponse = await AuthSession.exchangeCodeAsync(
            {
              clientId,
              code: response.params.code,
              redirectUri,
              codeVerifier: request?.codeVerifier,
              extraParams: {
                client_secret: process.env.EXPO_PUBLIC_GOOGLE_SECRET,
              },
            },
            discovery
          );

          console.log("Access Token:", tokenResponse.accessToken);
        } catch (error) {
          console.error("Token Exchange Error:", error);
        }
      };

      fetchToken();
    }
  }, [response]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View>
        <Text className="text-6xl text-center">Create a Workout</Text>
        <Pressable onPress={() => promptAsync()} disabled={!request}>
          <Text className="text-xl">Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
