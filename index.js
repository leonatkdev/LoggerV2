const readline = require("readline");
const fs = require("fs");
const path = require("path");
const prompt = require("prompt-sync")();

const log = (data, options = {}) => {
  const { depth = null, colors = true } = options;
  console.dir(data, { depth, colors });
};

const pauseAsync = () => {
  let skipLogs = false;

  return function handleSkip(
    data = null
  ) {
    if (skipLogs) {
      return { action: "continue", skipLogs };
    }

    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const keyListener = (chunk) => {
        const input = chunk.toString().trim().toLowerCase();

        if (input === "s") {
          console.log("Skipping this key...");
          cleanup();
          resolve({ action: "skip", skipLogs });
        } else if (input === "a") {
          console.log("Skipping further logs...");
          skipLogs = true;
          cleanup();
          resolve({ action: "continue", skipLogs });
        } else if (input === "j" && data) {
          const fileName = `log-${Date.now()}.json`;
          const filePath = path.resolve(process.cwd(), fileName);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
          console.log(`Data saved to ${filePath}`);
          return { action: "json", skipLogs };
        } else if (input === "") {
          cleanup();
          resolve({ action: "continue", skipLogs });
        } else {
          console.log(
            `Unknown input: "${input}". Please press "Enter", "s", or "a".`
          );
        }
      };

      const cleanup = () => {
        process.stdin.off("data", keyListener);
        rl.close();
      };

      process.stdin.on("data", keyListener);
    });
  };
};

const pauseStatic = () => {
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

// Export named methods
module.exports = { log, pauseAsync, pauseStatic };
