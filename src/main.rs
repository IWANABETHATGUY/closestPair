use std::{rc::Rc, time::Instant};

#[derive(Debug)]
pub struct RoundItem {
    x: f32,
    y: f32,
}
fn main() {
    let mut universe = closest_pair::RoundCanvas::new(1200, 1200, 10.0, 5000);
    universe.tick();
    let res = universe.closest_pair_dc();
    println!("{:?}", res);
}
