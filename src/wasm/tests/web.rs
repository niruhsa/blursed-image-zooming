//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm;
extern crate wasm_bindgen_test;

use wasm_bindgen_test::*;
use image::{open};
use wasm::img;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(1 + 1, 3);
}

#[wasm_bindgen_test]
fn transform_image() {
    let mut img = open("fixtures/test.jpg").unwrap();
    let rgba_img = img.to_rgba();
    let b64 = img::encode_png(&rgba_img);
}
