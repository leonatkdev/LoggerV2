import fs from "fs";
import path from "path";
import promptSync from "prompt-sync";

const prompt = promptSync();

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;

if (!isNode) {
  throw new Error("processStatic can only be used in a Node.js environment.");
}

/**
 * Synchronously processes an array of data with user interaction.
 *
 * @param {Array} items - Array of items to process.
 * @param {Object} [logOptions] - Options for logging.
 * @param {number|null} [logOptions.depth=null] - Specifies the depth of object inspection.
 * @param {boolean} [logOptions.colors=true] - Whether to display colors in the console output.
 */
export const processStatic = (items, logOptions = { depth: null, colors: true }) => {
  if (!Array.isArray(items)) {
    console.log(
      "processStatic: Received an object instead of an array. If you intended to log the object, use the log function of the library.",
    );
    return; // Exit early as we can't process the input
  }

  let skipLogs = false;

  for (const item of items) {
    if (!skipLogs) {
      console.log("Processing item:");
      console.dir(item, logOptions);
    }

    const input = prompt('Press "Enter" to continue, "s" to skip logging, or "j" to save as JSON...')
      .trim()
      .toLowerCase();

    if (input === "s") {
      console.log("Skipping further logs...");
      skipLogs = true;
      continue; // Skip further processing for this item
    }

    if (input === "j") {
      try {
        const fileName = `log-${Date.now()}.json`;
        const filePath = path.resolve(process.cwd(), fileName);
        fs.writeFileSync(filePath, JSON.stringify(item, null, 2), "utf-8");
        console.log(`Data saved to ${filePath}`);
        continue; // Continue to the next item after saving
      } catch (error) {
        console.error("Error saving to JSON:", error.message);
        continue; // Skip to the next item if saving fails
      }
    }

    if (input === "") {
      console.log(`Further processing for item with id: ${item.id}`);
    } else {
      console.log(`Unknown input: "${input}". Please press "Enter", "s", or "j".`);
    }
  }

  console.log("All items processed!");
};
