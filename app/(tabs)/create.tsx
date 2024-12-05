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
      <div className="text-center text-white">
        <h1 className="text-white text-6xl">Create a Workout Template</h1>
        <form className="text-black bg-white rounded-md">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
          <label htmlFor="day">Day</label>
          <select>
            <option value="push">Push</option>
            <option value="pull">Pull</option>
            <option value="legs">Legs</option>
          </select>
          <label htmlFor="exercises">Exercises</label>
          <input type="checkbox" id="exercises" name="exercises" />
          <input type="checkbox" id="exercises" name="exercises" />
          <input type="checkbox" id="exercises" name="exercises" />
          <input type="checkbox" id="exercises" name="exercises" />
        </form>
      </div>
      {/* <Button onPress={() => fetchHello()} title="Fetch hello" />; */}
    </div>
  );
}
