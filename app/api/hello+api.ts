import Exercise from "../../db/models/Exercise";
import { connectMongo } from "../../db/index";
import dotenv from "dotenv";

dotenv.config();

export async function GET(request: Request): Promise<Response> {
  try {
    // Connect to the database
    await connectMongo();

    // Create a new Exercise entry
    const newEntry = await Exercise.create({
      title: "Exercise Example",
      user: null,
    });

    // Return a JSON response
    return new Response(
      JSON.stringify({ message: "Exercise created", data: newEntry }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    // Ensure the error is properly typed
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Handle errors
    return new Response(
      JSON.stringify({
        error: "Failed to create exercise",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
