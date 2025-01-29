import fs from "fs";
import path from "path";
import promptSync from "prompt-sync";
import saveAsJsonFunction from "../helpers/saveAsJson.mjs";


const prompt = promptSync();

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;

/**
 * Creates a handler for interactive pauses in Node.js (static/synchronous version).
 *
 * Allows skipping logs, continuing, or saving data to JSON.
 *
 * @returns {Function} - A handler function that takes data and returns an action.
 */
export const pauseStatic = () => {
  if (!isNode) {
    throw new Error("pauseStatic can only be used in a Node.js environment.");
  }

  let skipLogs = false; // Track whether logs should be skipped

  /**
   * Handles user input, logging, and actions for the current item (static/synchronous).
   *
   * @param {any} data - The data being processed.
   * @returns {{action: string, skipLogs: boolean}} - Action and skipLogs flag.
   * * @param {string} [logOptions.folderName="loggers-v2"] - Create a folder and save the logged files 
   */
  return function handleSkip(data = null, logOptions = { depth: null, colors: true }) {
    if (skipLogs) {
      return { action: "continue", skipLogs };
    }

    console.log(`Ready to process item with id: ${data.id}`);
    console.dir(data, logOptions);

    // Display prompt and handle user input
    const input = prompt(
      'Press "Enter" to continue, "s" skip loggings, or "j" to save as JSON...'
    )
      .trim()
      .toLowerCase();

    if (input === "s") {
      console.log("Skipping all logs...");
      skipLogs = true; // Set skipLogs to true for future iterations
      return { action: "continue", skipLogs };
    }

    if (input === "j" && data) {
      try {
        saveAsJsonFunction(data, logOptions);
        return { action: "json", skipLogs };
      } catch (error) {
        console.error("Error saving to JSON:", error.message);
        return { action: "error", skipLogs };
      }
    }

    if (input === "") {
      return { action: "continue", skipLogs };
    }

    // Handle unknown input
    console.log(
      `Unknown input: "${input}". Please press "Enter", "s", or "j".`
    );
    return { action: "invalid", skipLogs };
  };
};
