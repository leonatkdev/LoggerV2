const readline = require('readline');
const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')(); // For synchronous input

class LoggerV2 {
  static log(data, options = {}) {
    const { depth = null, colors = true } = options;
    console.dir(data, { depth, colors });
  }

  // Async pause method
  static pauseAsync(message = 'Press Enter to continue (s to skip, q to quit, j to save to JSON)...', data) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve, reject) => {
      rl.question(message, (input) => {
        rl.close();
        const userInput = input.toLowerCase();

        if (userInput === 's') {
          resolve('skip');
        } else if (userInput === 'q') {
          reject(new Error('User quit the process.'));
        } else if (userInput === 'j') {
          if (data) {
            const filename = `log-output-${Date.now()}.json`;
            const filePath = path.resolve(process.cwd(), filename);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
            console.log(`Data saved to ${filePath}`);
            resolve('json_saved');
          } else {
            console.log('No data available to save.');
            resolve();
          }
        } else {
          resolve();
        }
      });
    });
  }

  // Synchronous pause method
  static pauseStatic(message = 'Press Enter to continue or type "s" to skip...') {
    try {
      const input = prompt(message).trim().toLowerCase(); // Get user input
      if (input === 's') {
        console.log('Skipping...');
        return 'skip'; // Return a specific value to indicate skipping
      }
      return 'continue'; // Return a specific value to indicate continuation
    } catch (error) {
      console.error('Synchronous pause is unavailable in this environment.');
      return 'error'; // Indicate an error state
    }
  }
}

module.exports = LoggerV2;
