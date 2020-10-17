use base64;

use image::{png::PngEncoder, ImageBuffer, ImageError, Pixel, load_from_memory, imageops::FilterType, open, ImageOutputFormat};
use std::ops::Deref;
use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub struct TouchCoordinates {
    pub x: u32,
    pub y: u32,
    pub w: u32,
    pub h: u32,
    pub originalWidth: u32,
    pub originalHeight: u32
}

pub fn encode_png<P, Container>(img: &ImageBuffer<P, Container>) -> Result<Vec<u8>, ImageError> where P: Pixel<Subpixel = u8> + 'static, Container: Deref<Target = [P::Subpixel]>, {
    let mut buf = Vec::new();
    let encoder = PngEncoder::new(&mut buf);
    encoder.encode(img, img.width(), img.height(), P::COLOR_TYPE).unwrap();
    Ok(buf)
}

fn decode_base64(b64: &str) -> Result<Vec<u8>, &str> {
    let ubf = base64::decode(&b64).unwrap();
    Ok(ubf)
}

pub fn transform_image(b64: &str, info: TouchCoordinates) -> Result<String, ImageError> {
    let u8DataArray = decode_base64(&b64).unwrap();
    let mut img = load_from_memory(&u8DataArray).unwrap();
    let cimage = img.crop(info.x, info.y, info.w, info.h);
    let rimage = cimage.resize(info.originalWidth, info.originalHeight, FilterType::Nearest);
    let mut buf = vec![];
    rimage.write_to(&mut buf, image::ImageOutputFormat::Png);
    let data64 = format!("data:image/png;base64,{}", base64::encode(&buf));

    
    Ok(data64)
}