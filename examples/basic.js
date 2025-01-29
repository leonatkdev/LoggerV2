import {
  log,
  pauseAsync,
  pauseStatic,
  processAsync,
  processStatic,
} from "../index.mjs";

// Items to process
const items = (type) => [
  { id: 1, name: `Item 1 ${type}`, details: { value: 100 } },
  { id: 2, name: `Item 2 ${type}`, details: { value: 200 } },
  { id: 3, name: `Item 3 ${type}`, details: { value: 300 } },
];

// Test log function
console.log("Testing log function...");
log(items("Test"), { depth: 2, colors: true });
console.log("Log function tested successfully!");

console.log("Testing save as file log function...");
log(items("Test"), { saveAsJson: true, depth: 2, colors: true });
console.log("Log function save as file successfully!");

items("static")?.map((item) => {
  return log(item, { saveAsJson: true, depth: 2, colors: true });
});

// Async version of item processing
async function testPauseAsync() {
  console.log("\nTesting pauseAsync function...");
  const handleSkip = pauseAsync(); // Create the async handler function

  for (const item of items("Async")) {
    const { action } = await handleSkip(item, { depth: 2, colors: true });

    if (action === "json") {
      console.log(`Item with id: ${item.id} saved to JSON.`);
      continue; // Continue to the next item after saving
    }
  }

  console.log("pauseAsync function tested successfully!");
}

// Non-async version of item processing
function testPauseStatic() {
  console.log("\nTesting pauseStatic function...");
  const handleSkip = pauseStatic(); // Create the static handler function

  for (const item of items("Static")) {
    const { action } = handleSkip(item);

    if (action === "json") {
      console.log(`Item with id: ${item.id} saved to JSON.`);
      continue; // Continue to the next item after saving
    }
  }

  console.log("pauseStatic function tested successfully!");
}

// Test processAsync
async function testProcessAsync() {
  console.log("\nTesting processAsync function...");
  await processAsync(items("Async Processing"), { depth: 2, colors: true });
  console.log("processAsync function tested successfully!");
}

// Test processStatic
function testProcessStatic() {
  console.log("\nTesting processStatic function...");
  processStatic(items("Static Processing"), { depth: 2, colors: true });
  console.log("processStatic function tested successfully!");
}

// Run all tests
(async () => {
  try {
    console.log("Running tests...");
    await testPauseAsync();
    testPauseStatic();
    await testProcessAsync();
    testProcessStatic();
    console.log("\nAll tests completed successfully!");
  } catch (error) {
    console.error("An error occurred during testing:", error);
  }
})();
