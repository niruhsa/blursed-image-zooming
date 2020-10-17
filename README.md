# PoC Matrix-based image zooming using web assembly

### Issues
 - Low FPS
 - Can't zoom in at specific area, it's hard coded at the minute
 - Can't pan/scroll on a zoomed in image yet
 - Minimum zoom of 1x and maximum zoom of 10x (hardcoded)

### Todo
 - Fix FPS issues (WIP)
 - Optimize Rust code (WIP)

### Building
To build the WASM files just run `yarn run compile-wasm`. Please make sure you are on a unix-like system where unix file system commands are available otherwise this will fail.

This also requires you to have **rust**, **rustup**, **cargo** and **wasm-pack** installed & configured with default settings at the bare minimum.