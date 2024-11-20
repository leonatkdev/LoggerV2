# LoggerV2

[![npm version](https://img.shields.io/npm/v/loggerv2?style=flat-square)](https://www.npmjs.com/package/loggerv2)
[![npm version](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=loggerv2&query=$.install.pretty&label=install%20size&style=flat-square)](https://www.npmjs.com/package/loggerv2)


Repo: https://github.com/leonatkdev/LoggerV2


LoggerV2 is a lightweight and flexible Node.js utility for interactive logging, pausing execution, and saving data during debugging. It offers features like depth control, colorized output, and interactive commands for skipping or saving data to JSON files.

> ⚠️ **Warning:**  
> This version of `LoggerV2` is **for testing purposes only** and is not stable for production use.  


## Features

- **Dynamic Logging**: Easily log objects with customizable depth and colorized output.
- **Interactive Pause**: Pause and inspect loops with user-controlled options (continue, skip, or save).
- **Save to JSON**: Export logged data to JSON files for analysis and persistence.
- **Process Control**: Debug interactively with full control over flow and inspection.
- **Node.js Focused**: Exclusively built for Node.js environments to streamline debugging.

---

## Examples

### **1. Basic Logging**
Log data with optional configurations:
```javascript
import { log } from "loggerv2";

// Example data
const data = { id: 1, name: "Test Item" };

// Log with depth and colorized output
log(data, { depth: 2, colors: true });

// Output:
// { id: 1, name: 'Test Item' }
```

### **2. Save Data to JSON**
Log data and save it directly to a JSON file:
```javascript
import { log } from "loggerv2";

// Example data
const data = { id: 1, name: "Test Item" };

// Save data as JSON
log(data, { saveAsJson: true });

// Terminal:
// Data saved to /path/to/log-1732138956514.json
```
### **3. Interactive Process with processAsync**
Handle loops in asynchronous functions with interactive actions:
```javascript
import { processAsync } from "loggerv2";

// Example items
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

async function testProcessAsync() {
  console.log("\nTesting processAsync function...");
  await processAsync(items, { depth: 2, colors: true });
  console.log("processAsync function tested successfully!");
}

testProcessAsync();
```

### **4.Synchronous Processing with processStatic**
Handle loops in synchronous functions with similar interactivity:
```javascript
import { processStatic } from "loggerv2";

// Example items
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

function testProcessStatic() {
  console.log("\nTesting processStatic function...");
  processStatic(items, { depth: 2, colors: true });
  console.log("processStatic function tested successfully!");
}

testProcessStatic();
```


### **5 Interactive Pause with pauseAsync**
Handle loops in asynchronous functions with interactive actions:
```javascript
import { pauseAsync } from "loggerv2";

// Example items
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

async function processItems() {
  const handleSkip = pauseAsync(); // Create an async handler

  for (const item of items) {
    const { action } = await handleSkip(item);

    if (action === "json") {
      console.log("Data saved to JSON.");
      continue;
    }

    console.log(`Processing: ${item.name}`);
  }

  console.log("All items processed.");
}

processItems();
```

---


### **6  Interactive Pause with pauseStatic**
Pause loops in synchronous functions for debugging:

```javascript
import { pauseStatic } from "loggerv2";

// Example items
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

const handleSkip = pauseStatic(); // Create a static handler

for (const item of items) {
  const { action } = handleSkip(item);

  if (action === "json") {
    console.log("Data saved to JSON.");
    continue;
  }

  console.log(`Processing: ${item.name}`);
}

console.log("All items processed.");
```

---


## Installation
Install LoggerV2 via npm:

```bash
npm install loggerv2
```

## Actions in Interactive Loops
 * Press Enter: Continue to the next item in the loop
 * Press s: Skip all logs for subsequent items.
 * Press j: Save the current item to a JSON file.



## Options
Logging Options

| Option        | Type          | Default  |  Description                          |
| ------------- |:-------------:| -----:   |-----------------------------------:   |
| depth         | number        | null     |  Sets the depth for object inspection.|
| colors        | boolean       | true     |Enables or disables colored output.    |
| saveAsJson    | boolean       | false    |Saves the logged data to a JSON file.  |
