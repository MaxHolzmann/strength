import { Image, StyleSheet, Platform, Button } from "react-native";
import "../../global.css";

async function fetchHello() {
  const response = await fetch("/api/hello");
  const data = await response.json();
  alert("Hello " + data.hello);
}

export default function HomeScreen() {
  return (
    <div className="">
      <div className="text-center">
        <h1 className="text-white text-6xl">Create a Workout</h1>
      </div>
      <Button onPress={() => fetchHello()} title="Fetch hello" />;
    </div>
  );
}
