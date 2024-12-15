import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSelection } from "../context/SelectionContext";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import "../../global.css";

export default function HomeScreen() {
  const router = useRouter();
  const { selections, setSelections } = useSelection(); // Get selections from context
  const [exercises, setExercises] = useState([{}]); // Initial state with one empty exercise
  const { control, handleSubmit } = useForm();

  const handleSelectExercise = (index: number) => {
    router.push(`/selection?exerciseIndex=${index + 1}`); // Use query string directly
  };

  const addExercise = () => {
    setExercises([...exercises, {}]); // Add a new exercise object to the state
  };

  const deleteExercise = (index) => {
    const updatedSelections = { ...selections };
    delete updatedSelections[`exercise${index + 1}`];

    const reindexedSelections = {};
    Object.keys(updatedSelections).forEach((key) => {
      const exerciseNumber = parseInt(key.replace("exercise", ""), 10);
      if (exerciseNumber > index + 1) {
        reindexedSelections[`exercise${exerciseNumber - 1}`] =
          updatedSelections[key];
      } else {
        reindexedSelections[key] = updatedSelections[key];
      }
    });

    setSelections(reindexedSelections); // Update context
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <ScrollView>
      <div className="flex flex-col-reverse">
        <div className="text-center text-white">
          <h1 className="text-white text-6xl">Create a Workout Template</h1>
          <form
            className="text-black bg-white rounded-xl flex flex-col items-center justify-center m-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="title">Workout Name</label>
            <input
              type="text"
              id="title"
              name="title"
              className="border-black border-2 shadow-sm rounded-md"
              ref={control}
            />
            <label htmlFor="day">Split Name</label>
            <select
              className="border-black border-2 shadow-sm rounded-md"
              ref={control}
            >
              <option value="push">Push</option>
              <option value="pull">Pull</option>
              <option value="legs">Legs</option>
            </select>
            <div className="flex flex-col">
              <label htmlFor="exercises">Exercises</label>
              {exercises.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-200 rounded-md p-2 m-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => deleteExercise(index)}
                    className="absolute top-0 left-0 text-red-600"
                    style={{ fontSize: 18 }}
                  >
                    <AntDesign name="close" size={18} color="red" />{" "}
                  </button>
                  <div>
                    <h2 className="text-xl">Selected Exercise:</h2>
                    <p className="text-xl text-blue-600">
                      {selections[`exercise${index + 1}`]}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSelectExercise(index)}
                      className="border-black border-2 shadow-sm rounded-md p-2 bg-gray-300"
                    >
                      Select Exercise
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addExercise}
                className="border-black border-2 shadow-sm rounded-md p-2 bg-green-300 mt-4"
              >
                + Add Another Exercise
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 border-black border-2 shadow-sm rounded-md p-2 bg-blue-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </ScrollView>
  );
}
