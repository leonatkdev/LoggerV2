import readline from "readline";
import fs from "fs";
import path from "path";
import promptSync from "prompt-sync";
const prompt = promptSync();

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;

/**
 * Logs data to the console.
 *
 * @param {any} data - The data to be logged.
 * @param {Object} [options] - Optional logging configuration.
 * @param {number|null} [options.depth=null] - Specifies the depth of object inspection.
 * @param {boolean} [options.colors=true] - Whether to display colors in the console output.
 */
export const log = (data, options = {}) => {
  const { depth = null, colors = true } = options;
  if (isNode) {
    console.dir(data, { depth, colors });
  } else {
    console.log("Logger (Browser):", JSON.stringify(data, null, 2));
  }
};

// module.exports = log ;
