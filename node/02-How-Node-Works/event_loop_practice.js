const fs = require("fs");

setTimeout(function () {
  // 1. Timer Phase
  setTimeout(function () {
    console.log("1. Timer Phase");
  }, 0);

  // 2. I/O Phase
  fs.readFile(``, "utf8", function (err, data) {
    console.log("2. I/O Callbacks Phase");
    process.nextTick(function () {
      console.log("2A. MicroTask : process.nextTick (high priority)");
    });
    setImmediate(function () {
      console.log("2B. setImmediate Phase");
    });
    setTimeout(function () {
      console.log("2C. setTimeOut Phase");
    }, 0);
  });

  // 3. setImmediate Phase
  setImmediate(function () {
    console.log("3. setImmediate Phase");
  });

  // 4. Close Callback Phase ( Not Possible to show Now )

  // MicroTask :  process.nextTick() ( High Priority )
  process.nextTick(function () {
    console.log(">> MicroTask : process.nextTick (high priority)");
  });

  // MicroTask :  process.nextTick() ( Low Priority )
  Promise.resolve().then(function () {
    console.log(">> MicroTask : promise relove (low priority)");
  });
}, 0);
