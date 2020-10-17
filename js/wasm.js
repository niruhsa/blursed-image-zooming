import wasm, { greet, zoom_image } from "../src/wasm/pkg/wasm.js";

wasm();
window.greet = greet;
window.zoom_image = zoom_image;