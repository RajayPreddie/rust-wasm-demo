use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn add(a: f64, b: f64) -> f64 {
    a + b
}

// TODO: Create a subtract function

// TODO: Create a multiply function

#[wasm_bindgen]
pub fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        // TODO: show an alert error message
        return 0.0;
    }
    a / b
}
