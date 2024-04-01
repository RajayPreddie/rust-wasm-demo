# Rust WebAssembly Project Setup

This README guides you through setting up a Rust WebAssembly project, from installing Rust on Windows or Mac to running a local server with Python or Webpack.

## Prerequisites

### Install Rust

#### Windows/Mac

1. Download and run the Rust installer from [the official Rust site](https://www.rust-lang.org/tools/install).
2. Follow the on-screen instructions to complete the installation.

### Install wasm-pack

`wasm-pack` is a tool for building Rust-generated WebAssembly packages for the web.

```bash
cargo install wasm-pack
```

## Setting Up Your Project

### Create a New Library

```bash
cargo new --lib hello-wasm
cd hello-wasm
```

### Add wasm-bindgen Dependency

```bash
cargo add wasm-bindgen
```

### Setup Cargo.toml

Add the following to your `Cargo.toml` file:

```toml
name = "graphics"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
description = "A demo project with wasm-pack"
license = "MIT/Apache-2.0"
repository = "https://github.com/RajayPreddie/rust-wasm-demo"
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

### Build the Project

```bash
wasm-pack build --target web
```
### Add Code to src/lib.rs

Remove the existing code and add the following code:

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```
### Create index.html

Create an `index.html` file in the root of your project with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello Wasm</title>
    
</head>
<body>
    <script type="module" src ="./index.js">
    </script>
</body>
</html>
```

### Create index.html

Create an `index.js` file in the root of your project with the following content:

```js
// Import our outputted wasm ES6 module
// Which, export default's, an initialization function
import init, {greet} from "./pkg/hello_world.js";

const runWasm = async () => {
  // Instantiate our wasm module
  await init();
  greet("WebAssembly!");
 
};
runWasm();
```

### Serve with Python

```bash
python3 -m http.server
```
### Serve with http-server
```bash
http-server    
```

## Advanced Setup with Webpack

### Build for Bundler

```bash
wasm-pack build --target bundler
```

### Setup the Site Directory

```bash
mkdir site && cd site
npm init -y
npm i ../pkg
npm i -D webpack@5 webpack-cli@5 webpack-dev-server@4 copy-webpack-plugin@11
```

### Create webpack.config.js

Add a `webpack.config.js` file with the following content:

```javascript
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "index.html", to: "." },
            ],
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    experiments: {
        asyncWebAssembly: true,
    },
};
```

### Add package.json Content

Ensure your `package.json` includes:

```json
"scripts": {
    "build": "webpack --config webpack.config.js",
    "serve": "webpack serve --config webpack.config.js --open"
  }
```

### Create index.js

Create an `index.js` in your site directory with the following:

```javascript
import init, { greet } from './pkg/hello_wasm.js';

async function run() {
    await init();
    console.log(greet("World"));
}

run();
```

### Create index.html

In the `site` directory, create an `index.html` file similar to the one provided above, ensuring the script tag sources `bundle.js`.

### Run the Project

```bash
npm run serve
```

Navigate to the URL provided by webpack-dev-server to view your project.

This repository was created with the aid of ChatGPT.
