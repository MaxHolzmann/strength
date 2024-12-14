import { Image, StyleSheet, Platform, Button } from "react-native";
import "../../global.css";

async function fetchHello() {
  const response = await fetch("/api/hello");
  const data = await response.json();
  alert("Hello " + data.hello);
}

export default function HomeScreen() {
  return (
    <div className="flex flex-col-reverse">
      <div className="text-center text-white">
        <h1 className="text-white text-6xl">Create a Workout Template</h1>
        <form className="text-black bg-white rounded-xl flex flex-col items-center justify-center m-10">
          <label htmlFor="title">Workout Name</label>
          <input
            type="text"
            id="title"
            name="title"
            className=" border-black border-2 shadow-sm rounded-md"
          />
          <label htmlFor="day">Split Name</label>
          <select className=" border-black border-2 shadow-sm rounded-md">
            <option value="push">Push</option>
            <option value="pull">Pull</option>
            <option value="legs">Legs</option>
          </select>
          <div className="flex flex-col">
            <label htmlFor="exercises">Exercises</label>

            <div className="flex flex-col bg-gray-200 rounded-md p-2 m-4">
              <div>
                <h2 className="text-xl">Exercise {1}</h2>
                <select className=" border-black border-2 shadow-sm rounded-md">
                  <option value="push">Push</option>
                  <option value="pull">Pull</option>
                  <option value="legs">Legs</option>
                </select>
              </div>
              <p>Reps</p>
              <input
                className=" border-black border-2 shadow-sm rounded-md"
                type="number"
              ></input>
              <p>Weight</p>
              <input
                className=" border-black border-2 shadow-sm rounded-md"
                type="number"
              ></input>
            </div>
          </div>
        </form>
      </div>
      {/* <Button onPress={() => fetchHello()} title="Fetch hello" />; */}
    </div>
  );
}
