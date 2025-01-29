import saveAsJsonFunction from "../helpers/saveAsJson.mjs";

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;

/**
 * Logs data to the console and optionally saves it to a JSON file.
 *
 * @param {any} data - The data to be logged.
 * @param {Object} [logOptions] - Optional logging configuration.
 * @param {number|null} [logOptions.depth=null] - Specifies the depth of object inspection.
 * @param {boolean} [logOptions.colors=true] - Whether to display colors in the console output.
 * @param {boolean} [logOptions.saveAsJson=false] - Whether to save the data to a JSON file.
 * @param {string} [logOptions.folderName="loggers-v2"] - Create a folder and save the logged files 
*/

export const log = (data, logOptions = {}) => {
  const {
    depth = null,
    colors = true,
    saveAsJson = false,
    folderName = "loggers-v2",
  } = logOptions;
  if (
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node
  ) {
    if (saveAsJson) {
      saveAsJsonFunction(data, logOptions);
      return;
    }

    // Log to the console
    console.dir(data, { depth, colors });
  } else {
    // Fallback for browser environments
    console.log("Logger (Browser):", JSON.stringify(data, null, 2));
  }
};
