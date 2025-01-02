import Routine from "../../db/models/Routine";
import { connectMongo } from "../../db/index";
import dotenv from "dotenv";

dotenv.config();

export async function GET(request: Request): Promise<Response> {
  try {
    await connectMongo();

    const routines = await Routine.find();

    return new Response(
      JSON.stringify({ message: "Routines found", data: routines }),
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
        error: "Failed to get routines",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
