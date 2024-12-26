import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelection } from "../context/SelectionContext";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

export default function HomeScreen() {
  const router = useRouter();
  const { selections, setSelections } = useSelection();
  const [exercises, setExercises] = useState([{}]);
  const { control, handleSubmit } = useForm();

  const handleSelectExercise = (index) => {
    router.push(`/selection?exerciseIndex=${index + 1}`);
  };

  const addExercise = () => {
    setExercises([...exercises, {}]);
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

    setSelections(reindexedSelections);
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="flex-1 bg-gray-100"
    >
      <View className="flex flex-col items-center p-4">
        <Text className="text-black text-4xl text-center mb-4">
          New Workout Template
        </Text>
        <View className="bg-white rounded-xl p-4 shadow-md w-full">
          {/* Form starts here */}
          <Controller
            name="workoutName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Text className="text-black mb-2">Workout Name</Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter workout name"
                  className="border border-black rounded-md px-4 py-2 mb-2"
                />
                {error && <Text className="text-red-500">{error.message}</Text>}
              </>
            )}
          />
          <View>
            <Controller
              name="splitName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Text className="text-black mb-2">Split Name</Text>
                  <RNPickerSelect
                    onValueChange={onChange}
                    value={value}
                    items={[
                      { label: "Push", value: "push" },
                      { label: "Pull", value: "pull" },
                      { label: "Legs", value: "legs" },
                    ]}
                    placeholder={{ label: "Select a split...", value: null }}
                    style={{
                      inputAndroid: {
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 8,
                        padding: 12,
                        backgroundColor: "#f9fafb",
                        color: "black",
                      },
                      inputIOS: {
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 8,
                        padding: 12,
                        backgroundColor: "#f9fafb", // Tailwind's bg-gray-50 equivalent
                        color: "black",
                      },
                    }}
                  />
                  {error && (
                    <Text className="text-red-500">{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          <View>
            <Text className="text-black mt-4 mb-2">Exercises</Text>
            {exercises.map((_, index) => (
              <View
                key={index}
                className="bg-gray-200 rounded-md p-4 mb-4 relative"
              >
                <Pressable
                  onPress={() => deleteExercise(index)}
                  className="absolute top-2 right-2"
                >
                  <AntDesign name="close" size={18} color="red" />
                </Pressable>
                <Text className="text-lg">Selected Exercise:</Text>
                <Text className="text-blue-600 mb-2">
                  {selections[`exercise${index + 1}`] || "None selected"}
                </Text>
                <Pressable
                  onPress={() => handleSelectExercise(index)}
                  className="bg-gray-300 rounded-md px-4 py-2"
                >
                  <Text>Select Exercise</Text>
                </Pressable>
                <View className="mt-2">
                  <Controller
                    name={"set" + index}
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Text>Goal Set #</Text>
                        <TextInput
                          keyboardType="numeric"
                          className="bg-gray-300 rounded-md p-2 my-2"
                        ></TextInput>
                      </>
                    )}
                  />
                </View>
                <View>
                  <Controller
                    name={"rep" + index}
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Text>Goal Rep #</Text>
                        <TextInput
                          keyboardType="numeric"
                          className="bg-gray-300 rounded-md p-2 my-2"
                        ></TextInput>
                      </>
                    )}
                  />
                </View>
              </View>
            ))}
            <Pressable
              onPress={addExercise}
              className="bg-green-300 rounded-md px-4 py-2 mt-2"
            >
              <Text className="text-center">+ Add Another Exercise</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-blue-500 rounded-md px-4 py-2 mt-4"
          >
            <Text className="text-center text-white">Submit</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
