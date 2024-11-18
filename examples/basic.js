const LoggerV2 = require("../index");

// Items to process
const items = [
  { id: 1, name: "Item 1", details: { value: 100 } },
  { id: 2, name: "Item 2", details: { value: 200 } },
  { id: 3, name: "Item 3", details: { value: 300 } },
];

// Async version of item processing
async function processItemsAsync(items) {
  const handleSkip = LoggerV2.pauseAsync(); // Create the async handler function

  for (const item of items) {
    console.log(`Ready to process item with id: ${item.id}
      Press "Enter" to continue, "s" to skip, "a" to skip logging, or "j" to save as JSON...`);
    const { action, skipLogs } = await handleSkip(item);

    if (!skipLogs) {
      LoggerV2.log(item); // Log the current item if logging is not skipped
    }

    if (action === "skip") {
      console.log(`Skipping processing for item with id: ${item.id}`);
      continue; // Skip further processing for this item
    }

    if (action === "json") {
      console.log(`Item with id: ${item.id} saved to JSON.`);
      continue; // Continue to the next item after saving
    }

    console.log(`Processing item with id: ${item.id}`);
    // Simulate further processing
  }

  console.log("All items processed!");
}


// Call async version
processItemsAsync(items);

// --------------------------- //

// // Non-async version using recursion
// function processItems(items) {
//   const handleSkip = LoggerV2.pauseStatic(); // Create the static handler function

//   for (const item of items) {
//     const { action, skipLogs } = handleSkip(
//       'Press "Enter" to continue, "s" to skip, "a" to skip logging, or "j" to save as JSON...',
//       item
//     );

//     if (action === "invalid") {
//       console.log('Invalid input! Please try again.');
//       continue; // Skip to the next item without processing
//     }

//     if (!skipLogs) {
//       LoggerV2.log(item); // Log the current item if logging is not skipped
//     }

//     if (action === "skip") {
//       console.log(`Skipping processing for item with id: ${item.id}`);
//       continue; // Skip further processing for this item
//     }

//     if (action === "json") {
//       console.log(`Item with id: ${item.id} saved to JSON.`);
//       continue; // Continue to the next item after saving
//     }

//     console.log(`Processing item with id: ${item.id}`);
//     // Simulate further processing
//   }

//   console.log("Finished processing all items.");
// }


// // Call non-async version
// processItems(items);


