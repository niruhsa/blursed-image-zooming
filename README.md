# PoC Matrix-based image zooming using web assembly

### Issues
 - Low FPS
 - Can't zoom in at specific area, it's hard coded at the minute
 - Can't pan/scroll on a zoomed in image yet
 - Minimum zoom of 1x and maximum zoom of 10x (hardcoded)

### Todo
 - Fix FPS issues
 - Optimize Rust code

### Building
To build the WASM files `cd` into `src/wasm` and run `wasm-pack build --target web`.