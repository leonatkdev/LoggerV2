import fs from "fs";
import path from "path";

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;

/**
 * Logs data to the console and optionally saves it to a JSON file.
 *
 * @param {any} data - The data to be logged.
 * @param {Object} [options] - Optional logging configuration.
 * @param {number|null} [options.depth=null] - Specifies the depth of object inspection.
 * @param {boolean} [options.colors=true] - Whether to display colors in the console output.
 * @param {boolean} [options.saveAsJson=false] - Whether to save the data to a JSON file.
 */
export const log = (data, options = {}) => {
  const { depth = null, colors = true, saveAsJson = false } = options;

  if (isNode) {
    // Save to JSON if enabled
    if (saveAsJson) {
      try {
        const fileName = `log-${Date.now()}.json`;
        const filePath = path.resolve(process.cwd(), fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        console.log(`Data saved to ${filePath}`);
      } catch (error) {
        console.error("Failed to save data to JSON file:", error.message);
      }
    }

    // Log to the console
    console.dir(data, { depth, colors });
  } else {
    // Fallback for browser environments
    console.log("Logger (Browser):", JSON.stringify(data, null, 2));
  }
};
