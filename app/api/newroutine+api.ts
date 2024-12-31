import Routine from "../../db/models/Routine";
import { connectMongo } from "../../db/index";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request: Request): Promise<Response> {
  try {
    // Connect to the database
    await connectMongo();

    // Parse the incoming request body
    const body = await request.json(); // Ensure the request body is JSON

    const { title, split, exercises, user } = body; // Destructure the data

    if (!title || !split || !exercises) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: title, split, or exercises",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create a new Routine entry in the database
    const newEntry = await Routine.create({
      title,
      split,
      exercises,
      user: user || null, // Default to null if user is not provided
    });

    return new Response(
      JSON.stringify({ message: "Routine created", data: newEntry }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({
        error: "Failed to create routine",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
