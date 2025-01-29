import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * Save data as a JSON file.
 * @param {Object} data - The data to save.
 * @param {Object} options - Options for saving.
 * @param {string} [options.folderName="loggers-v2"] - Folder name for logs.
 */ 


const saveAsJsonFunction = (data, options = {}) => {
  const { folderName = "loggers-v2" } = options;

  try {
    const logsFolderPath = path.resolve(process.cwd(), folderName);

    // Create the folder only if it doesn't exist
    if (!fs.existsSync(logsFolderPath)) {
      fs.mkdirSync(logsFolderPath, { recursive: true });
    }

    const now = new Date();
    const formattedTime = now
      .toLocaleTimeString("en-GB", { hour12: false }) // Format: HH-MM-SS
      .replace(/:/g, "-");

    const uniqueFileName = `log-${formattedTime}-${uuidv4()}.json`;
    const filePath = path.join(logsFolderPath, uniqueFileName);

    // Write the log data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Data saved to ${filePath}`);
  } catch (error) {
    console.error("Failed to save log data:", error.message);
  }
};

export default saveAsJsonFunction;
