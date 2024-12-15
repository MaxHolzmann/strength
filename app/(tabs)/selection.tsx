import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSelection } from "../context/SelectionContext";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SelectionScreen() {
  const router = useRouter();
  const { setSelection } = useSelection();
  const { exerciseIndex = "1" } = useLocalSearchParams(); // Default to "1" if undefined

  const handleSelection = (value: string) => {
    setSelection(`exercise${exerciseIndex}`, value); // Dynamically update the selection
    router.replace("/(tabs)/create");
  };

  const handleBack = () => {
    router.replace("/(tabs)/create");
  };

  const exerciseList = [
    "Bench Press",
    "Incline Bench Press",
    "Decline Bench Press",
    "Dumbbell Fly",
    "Cable Crossover",
    "Pec Deck Machine",
    "Lat Pulldowns",
    "Seated Row Machine",
    "T-Bar Rows",
    "Dumbbell Rows",
    "Barbell Rows",
    "Pull-ups (with Assisted Machine)",
    "Smith Machine Squats",
    "Leg Press",
    "Hack Squats",
    "Deadlifts",
    "Romanian Deadlifts",
    "Glute Kickback Machine",
    "Hamstring Curls",
    "Leg Extensions",
    "Standing Calf Raise Machine",
    "Seated Calf Raise Machine",
    "Bicep Curls (Dumbbells)",
    "Bicep Curls (Barbell)",
    "Cable Bicep Curls",
    "Preacher Curls",
    "Tricep Pushdowns",
    "Overhead Tricep Extensions (Cable)",
    "Tricep Dips (Machine)",
    "Shoulder Press (Dumbbells)",
    "Shoulder Press (Barbell)",
    "Overhead Press (Machine)",
    "Lateral Raises (Dumbbells)",
    "Lateral Raises (Cable)",
    "Front Raises (Dumbbells)",
    "Front Raises (Cable)",
    "Reverse Fly (Dumbbells)",
    "Reverse Fly (Machine)",
    "Shrugs (Dumbbells)",
    "Shrugs (Barbell)",
    "Kettlebell Swings",
    "Battle Ropes",
    "Medicine Ball Slams",
    "Rowing Machine",
    "Treadmill Sprints",
    "Elliptical Intervals",
    "Stair Climber",
    "Spinning Bike Sprints",
    "Dumbbell Chest Press",
    "Dumbbell Pullover",
    "Dumbbell Step-ups",
    "Dumbbell Goblet Squats",
    "Barbell Front Squats",
    "Sumo Deadlifts",
    "Kettlebell Deadlifts",
    "Kettlebell Clean and Press",
    "Landmine Press",
    "Cable Woodchoppers",
    "Landmine Twists",
  ];

  return (
    <View className="flex-1 bg-white">
      <div className="text-center">
        <AntDesign
          className="absolute left-0 p-1"
          name="caretleft"
          size={24}
          color="black"
          onPress={handleBack}
        />
        <Text className="text-2xl text-center my-5">Select an Exercise</Text>
      </div>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {exerciseList.sort().map((exercise, index) => (
          <TouchableOpacity
            className="p-4 bg-gray-200 my-2 w-4/5 items-center rounded-lg"
            key={index}
            onPress={() => handleSelection(exercise)}
          >
            <Text>{exercise}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
