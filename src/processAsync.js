import readline from "readline";
import fs from "fs";
import path from "path";

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;

if (!isNode) {
  throw new Error("processAsync can only be used in a Node.js environment.");
}

/**
 * Asynchronously processes an array of data with user interaction.
 *
 * @param {Array} items - Array of items to process.
 * @param {Object} [logOptions] - Options for logging.
 * @param {number|null} [logOptions.depth=null] - Specifies the depth of object inspection.
 * @param {boolean} [logOptions.colors=true] - Whether to display colors in the console output.
 * @returns {Promise<void>}
 */
export const processAsync = async (items, logOptions = { depth: null, colors: true }) => {
  if (!Array.isArray(items)) {
    console.log(
      "processAsync: Received an object instead of an array. If you intended to log the object, use the log function of the library.",
    );
    return; // Exit early as we can't process the input
  }


  let skipLogs = false;

  for (const item of items) {
    if (!skipLogs) {
      console.log("Processing item:");
      console.dir(item, logOptions);
    }

    const action = await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      console.log('Press "Enter" to continue, "s" to skip logging, or "j" to save as JSON...');
      rl.question("", (input) => {
        const key = input.trim().toLowerCase();

        if (key === "s") {
          console.log("Skipping further logs...");
          skipLogs = true;
          rl.close();
          resolve("skip");
        } else if (key === "j") {
          const fileName = `log-${Date.now()}.json`;
          const filePath = path.resolve(process.cwd(), fileName);
          fs.writeFileSync(filePath, JSON.stringify(item, null, 2), "utf-8");
          console.log(`Data saved to ${filePath}`);
          rl.close();
          resolve("json");
        } else {
          rl.close();
          resolve("continue");
        }
      });
    });

    if (action === "skip") {
      continue; // Skip further processing for this item
    }

    if (action === "json") {
      console.log(`Item with id: ${item.id} saved to JSON.`);
      continue; // Continue to the next item after saving
    }

    console.log(`Further processing for item with id: ${item.id}`);
  }

  console.log("All items processed!");
};
