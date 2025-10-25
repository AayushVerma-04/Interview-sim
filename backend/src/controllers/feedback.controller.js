import axios from "axios";
import client from "../utils/reddisClient.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";

export const generateFeedbackController = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      throw new ApiError(400, "sessionId is required");
    }

    // Call the Python microservice
    const response = await axios.post("http://localhost:8000/generate-feedback", { sessionId });

    const feedback = response.data;

    // Store feedback in Redis for later retrieval
    await client.hset(sessionId, "feedback", JSON.stringify(feedback));

    return res.status(200).json(new ApiResponse(200, feedback, "Feedback generated successfully."));
  } catch (error) {
    console.error("Feedback generation failed:", error.message);
    return res.status(500).json(new ApiError(500, "Error generating feedback"));
  }
};
