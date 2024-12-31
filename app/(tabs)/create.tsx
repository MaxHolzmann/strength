import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
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
  const [reps, setReps] = useState([{}]);
  const [sets, setSets] = useState([{}]);
  const {
    control,
    handleSubmit,
    getValues,
    unregister,
    setValue,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      isSubmitting,
      touchedFields,
      submitCount,
    },
  } = useForm();

  const handleSelectExercise = (index) => {
    router.push(`/selection?exerciseIndex=${index + 1}`);
  };

  const addExercise = () => {
    setExercises([...exercises, {}]);
  };

  const deleteExercise = (index) => {
    const updatedSelections = { ...selections };
    delete updatedSelections[`exercise${index + 1}`];

    // Unregister the current indices
    unregister(`exercise${index}`);
    unregister(`rep${index}`);
    unregister(`set${index}`);

    // Create a new array of exercises and reindex
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);

    // Reindex remaining exercises
    const reindexedSelections = {};
    updatedExercises.forEach((_, newIndex) => {
      const oldIndex = newIndex >= index ? newIndex + 1 : newIndex;
      reindexedSelections[`exercise${newIndex + 1}`] =
        updatedSelections[`exercise${oldIndex + 1}`];
      setValue(
        `exercise${newIndex}`,
        selections[`exercise${oldIndex + 1}`] || ""
      );
      setValue(`set${newIndex}`, getValues(`set${oldIndex}`) || "");
      setValue(`rep${newIndex}`, getValues(`rep${oldIndex}`) || "");
    });

    setSelections(reindexedSelections);

    // Clean up old unused fields
    for (let i = updatedExercises.length; i < exercises.length; i++) {
      unregister(`exercise${i}`);
      unregister(`set${i}`);
      unregister(`rep${i}`);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Form State", dirtyFields);
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
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter split name"
                    className="border border-black rounded-md px-4 py-2 mb-2"
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

                <Controller
                  name={`exercise${index}`}
                  control={control}
                  defaultValue={selections[`exercise${index + 1}`]}
                  render={({ field: { onChange, value } }) => {
                    React.useEffect(() => {
                      // Synchronize form state with selections
                      onChange(selections[`exercise${index + 1}`] || null);
                    }, [selections, index, onChange]);

                    return (
                      <>
                        <Text className="text-blue-600 mb-2">
                          {value || "None selected"}
                        </Text>
                        <Pressable
                          onPress={() => handleSelectExercise(index)}
                          className="bg-gray-300 rounded-md px-4 py-2"
                        >
                          <Text>Select Exercise</Text>
                        </Pressable>
                      </>
                    );
                  }}
                />
                <View className="mt-2">
                  <Controller
                    name={`set${index}`}
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Text>Goal Set #</Text>
                        <TextInput
                          keyboardType="numeric"
                          value={value}
                          onChangeText={onChange}
                          className="bg-gray-300 rounded-md p-2 my-2"
                        />
                      </>
                    )}
                  />
                </View>
                <View>
                  <Controller
                    name={`rep${index}`}
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Text>Goal Rep #</Text>
                        <TextInput
                          keyboardType="numeric"
                          value={value}
                          onChangeText={onChange}
                          className="bg-gray-300 rounded-md p-2 my-2"
                        />
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
