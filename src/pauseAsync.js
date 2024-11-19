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
  
    let skipLogs = false;
  
    /**
     * Handles user input to determine the next action.
     *
     * @param {any} data - The data being processed during the pause.
     * @returns {Promise<{action: string, skipLogs: boolean}>} - Action and skipLogs flag.
     */
    return function handleSkip(data) {
      if (skipLogs) {
        return Promise.resolve({ action: "continue", skipLogs });
      }
  
      return new Promise((resolve) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
  
        rl.question(
          'Press "Enter" to continue, "s" to skip, "a" to skip logging, or "j" to save as JSON...',
          (input) => {
            const key = input.trim().toLowerCase();
  
            if (key === "s") {
              console.log("Skipping this key...");
              rl.close();
              resolve({ action: "skip", skipLogs });
            } else if (key === "a") {
              console.log("Skipping further logs...");
              skipLogs = true;
              rl.close();
              resolve({ action: "continue", skipLogs });
            } else if (key === "j" && data) {
              const fileName = `log-${Date.now()}.json`;
              const filePath = path.resolve(process.cwd(), fileName);
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
              console.log(`Data saved to ${filePath}`);
              rl.close();
              resolve({ action: "json", skipLogs });
            } else {
              rl.close();
              resolve({ action: "continue", skipLogs });
            }
          }
        );
      });
    };
  };
  

  
// module.exports = pauseAsync ;