const readline = require('readline');

class LoggerV2 {
  static log(data, options = {}) {
    const { depth = null, colors = true } = options;
    // Log data with specified depth and colors
    console.dir(data, { depth, colors });
  }

  static pause(message = 'Press Enter to continue...') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(message, () => {
        rl.close();
        resolve();
      });
    });
  }
}

module.exports = LoggerV2;
