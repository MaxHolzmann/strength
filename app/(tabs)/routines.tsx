import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]); // Ensure the initial state matches the expected structure
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors

  const getRoutines = async () => {
    try {
      const response = await fetch("/api/getroutine");
      if (!response.ok) {
        throw new Error("Failed to fetch routines");
      }
      const data = await response.json();
      console.log("Raw API Response:", data);

      // Extract the data array from the response and set it to state
      setRoutines(data.data || []);
    } catch (err) {
      console.error("Error fetching routines:", err.message);
      setError(err.message); // Save the error message to state
    } finally {
      setLoading(false); // End the loading state
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  useEffect(() => {
    console.log("Updated Routines State:", routines); // Log routines after the state update
  }, [routines]);

  if (loading) {
    return <Text>Loading routines...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView className="bg-white flex-1">
      <Text className="text-center text-xl">Routines</Text>
      <View className="flex flex-col justify-center gap-8">
        {routines.length === 0 ? (
          <Text className="text-center">No routines found.</Text>
        ) : (
          routines.map((item, index) => (
            <View
              className="rounded-lg bg-gray-200 shadow-md flex flex-col p-4 text-center items-center"
              key={index}
            >
              <Text>{item.title}</Text>
              <Text>{item.split}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
