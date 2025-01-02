import { useEffect, useState } from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRoutines = async () => {
    try {
      const response = await fetch("/api/getroutine");
      if (!response.ok) {
        throw new Error("Failed to fetch routines");
      }
      const data = await response.json();
      console.log("Raw API Response:", data);

      setRoutines(data.data || []);
    } catch (err) {
      console.error("Error fetching routines:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  useEffect(() => {
    console.log("Updated Routines State:", routines);
  }, [routines]);

  if (loading) {
    return <Text>Loading routines...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="">
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
    </SafeAreaView>
  );
}
