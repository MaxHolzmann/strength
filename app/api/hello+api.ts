import Exercise from "../../db/models/Exercise";
import { connectMongo } from "../../db/index";
import dotenv from "dotenv";

dotenv.config();

export async function GET(request: Request): Promise<Response> {
  try {
    await connectMongo();

    const newEntry = await Exercise.create({
      title: "Exercise Example",
      user: null,
    });

    return new Response(
      JSON.stringify({ message: "Exercise created", data: newEntry }),
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
        error: "Failed to create exercise",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
