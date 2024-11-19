import readline from "readline";
import fs from "fs";
import path from "path";
import promptSync from "prompt-sync";
const prompt = promptSync();

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;


export const pauseStatic = () => {
  if (!isNode) {
    throw new Error("pauseStatic can only be used in a Node.js environment.");
  }

  let skipLogs = false;

  return function handleSkip(
    data = null
  ) {
    if (skipLogs) {
      return { action: "continue", skipLogs };
    }

    const input = prompt(
      'Press "Enter" to continue, "s" to skip, "a" to skip logging, or "j" to save as JSON...'
    ).trim().toLowerCase();

    if (input === "s") {
      console.log("Skipping this key...");
      return { action: "skip", skipLogs };
    }

    if (input === "a") {
      console.log("Skipping further logs...");
      skipLogs = true;
      return { action: "continue", skipLogs };
    }

    if (input === "j" && data) {
      const fileName = `log-${Date.now()}.json`;
      const filePath = path.resolve(process.cwd(), fileName);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`Data saved to ${filePath}`);
      return { action: "json", skipLogs };
    }

    if (input === "") {
      return { action: "continue", skipLogs };
    }

    console.log(
      `Unknown input: "${input}". Please press "Enter", "s", "a", or "j".`
    );
    return { action: "invalid", skipLogs };
  };
};


// module.exports =  pauseStatic 