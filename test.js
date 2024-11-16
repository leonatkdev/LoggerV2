const LoggerV2 = require('./index');

const items = (title) = [
  { id: 1, name: 'Item 1  ', details: { value: 100 } },
  { id: 2, name: 'Item 2', details: { value: 200 } },
  { id: 3, name: 'Item 3', details: { value: 300 } },
];

async function processItemsAsync(items) {
  for (const item of items) {
    LoggerV2.log(item);
    // Pause the loop
    await LoggerV2.pause();
  }

  console.log('All items processed!');
}

function processItems(items) {
  let index = 0;

  function processNext() {
    if (index < items.length) {
      const item = items[index];
      LoggerV2.log(item,  { depth: 2, colors: true });
      index++;

      // Pause and then process the next item
      LoggerV2.pause('Press Enter to continue...')
        .then(processNext);
    } else {
      console.log('All items processed!');
    }
  }

  // Start processing
  processNext();
}


processItems(items)
// processItemsAsync(items)