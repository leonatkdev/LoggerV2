import readline from "readline";
import fs from "fs";
import path from "path";
import promptSync from "prompt-sync";
const prompt = promptSync();

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;

/**
 * Creates a handler for interactive pauses in Node.js.
 *
 * Allows skipping logs, continuing, or saving data to JSON.
 *
 * @returns {Function} - A handler function that takes data and returns a Promise with an action.
 */

export const pauseAsync = () => {
  if (!isNode) {
    throw new Error("pauseAsync can only be used in a Node.js environment.");
  }

  let skipLogs = false; // Track whether logs should be skipped
  // let promptDisplayed = false; // Track whether the prompt text has been shown

  /**
   * Handles user input, logging, and actions for the current item.
   *
   * @param {any} data - The data being processed.
   * @param {Object} [logOptions] - Options for logging.
   * @param {number|null} [logOptions.depth=null] - Specifies the depth of object inspection.
   * @param {boolean} [logOptions.colors=true] - Whether to display colors in the console output.
   * @returns {Promise<{action: string, skipLogs: boolean}>} - Action and skipLogs flag.
   */
  return function handleSkip(data, logOptions = { depth: null, colors: true }) {
    if (skipLogs) {
      return Promise.resolve({ action: "continue" });
    }

    console.log(`Ready to process item with id: ${data.id}`);
    console.dir(data, logOptions);

    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      // Show the prompt text only once
      // if (!promptDisplayed) {
        console.log('Press "Enter" to continue, "s" skip loggings, or "j" to save as JSON...');
        // promptDisplayed = true; // Set the flag to true
      // }

      rl.question("", (input) => {
        const key = input.trim().toLowerCase();

       if (key === "s") {
          console.log("Skipping All logs...");
          skipLogs = true;
          rl.close();
          resolve({ action: "continue" });
        } else if (key === "j" && data) {
          const fileName = `log-${Date.now()}.json`;
          const filePath = path.resolve(process.cwd(), fileName);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
          console.log(`Data saved to ${filePath}`);
          rl.close();
          resolve({ action: "json" });
        } else {
          rl.close();
          resolve({ action: "continue" });
        }
      });
    });
  };
};

  

  