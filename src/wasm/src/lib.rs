pub mod utils;
pub mod img;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    utils::set_panic_hook();

    alert("Hello, wasm!");
}

#[wasm_bindgen]
pub fn zoom_image(b64: &str, x: u32, y: u32, w: u32, h: u32, ow: u32, oh: u32) -> String {
    utils::set_panic_hook();

    let coords = img::TouchCoordinates { x: x, y: y, w: w, h: h, originalWidth: ow, originalHeight: oh };

    let base64 = img::transform_image(&b64, coords).unwrap();
    base64.to_string()
}


mod test {

    use base64;
    use super::{img};
    use image::{open};

    #[test]
    fn transform_image() {
        let img: image::RgbImage = image::ImageBuffer::new(512, 512);
        let buf = img::encode_png(&img).unwrap();
        let b64 = base64::encode(&buf);
        let info = img::TouchCoordinates { x: 0, y: 0, w: 512, h: 512, originalWidth: 512, originalHeight: 512};
        let enc_img = img::transform_image(&b64, info);
        println!("{:?}", b64.to_string());
    }
}