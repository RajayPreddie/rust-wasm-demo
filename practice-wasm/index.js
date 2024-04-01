// Import the generated WebAssembly module
import {init, add} from './pkg/practice_wasm.js'; 

// This function will handle the initialization and setup of your WebAssembly module.
async function runWasm() {
  // Await the initialization of the calculator WebAssembly module.
  await init();

  // Once initialized, you can set up your event listeners as normal.
  document.getElementById('add').addEventListener('click', () => {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const result = add(a, b); // Now safe to call `add`
    document.getElementById('result').textContent = `Result: ${result}`;
  });

  // Add event listeners for subtract, multiply, and divide similarly
}
// Ensure the DOM is fully loaded before running the WebAssembly module setup.
document.addEventListener('DOMContentLoaded', runWasm);
runWasm();
