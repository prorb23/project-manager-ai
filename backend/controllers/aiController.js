import dotenv from "dotenv";
dotenv.config()
import { GoogleGenAI } from "@google/genai";
import Task from "../models/Task.js";

// Initialize Gemini with API Key from environment variable
const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY , // securely loaded from system environment
});

// Use the latest available model
const modelName = "gemini-2.5-flash";

// Helper function to call Gemini API
async function runGenerateContent(prompt) {
 try {
    const result = await ai.models.generateContent({
     model: modelName,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text =
        result.candidates?.[0]?.content?.parts
        ?.map(p => p.text)
        .filter(Boolean)
        .join("\n") || "No response generated.";

    return text;
  } catch (error) {
    console.error(`Error calling Gemini API: ${error.message}`, error);
    throw new Error("AI content generation failed");
  }
}


// ==========================================================
// @desc    Summarize all tasks for a project
// @route   POST /api/ai/summarize
// ==========================================================
export const summarizeProjectTasks = async (req, res) => {
  const { projectId } = req.body;

  try {
    const tasks = await Task.find({ project: projectId });

    if (tasks.length === 0) {
      return res.json({ summary: "This project has no tasks to summarize." });
    }

    const taskDetails = tasks
      .map(task => `- ${task.title} (Status: ${task.status})`)
      .join("\n");

    const prompt = `Please provide a one-paragraph, high-level summary for a project manager based on the following task list:\n\n${taskDetails}`;

    const summary = await runGenerateContent(prompt);

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error in summarizeProjectTasks:", error.message);
    res.status(500).json({ message: "Error generating summary from AI" });
  }
};

// ==========================================================
// @desc    Answer a question about a specific task
// @route   POST /api/ai/ask
// ==========================================================
export const answerTaskQuestion = async (req, res) => {
  const { taskId, question } = req.body;

  if (!question || !taskId) {
    return res.status(400).json({ message: "Task ID and question are required." });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    const prompt = `Given the following task:\nTitle: ${task.title}\nDescription: ${task.description || "No description provided."}\nStatus: ${task.status}\n\nAnswer this question: "${question}"`;

    const answer = await runGenerateContent(prompt);

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error in answerTaskQuestion:", error.message);
    res.status(500).json({ message: "Error generating answer from AI" });
  }
};