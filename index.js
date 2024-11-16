const readline = require('readline');
const fs = require('fs');
const path = require('path');

class LoggerV2 {
  static log(data, options = {}) {
    const { depth = null, colors = true } = options;
    console.dir(data, { depth, colors });
  } 
  
  
  static pause(message = 'Press Enter to continue (s to skip, q to quit, j to save to JSON)...', data) {
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
}

module.exports = LoggerV2;
