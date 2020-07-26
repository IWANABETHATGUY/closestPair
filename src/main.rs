use std::{rc::Rc, time::Instant};

#[derive(Debug)]
pub struct RoundItem {
    x: f32,
    y: f32,
}
fn main() {
    // let a = std::mem::size_of::<RoundItem>();
    let mut a = vec![];
    for i in 0..10 {
        a.push(Rc::new(RoundItem {
            x: i as f32,
            y: i as f32 * -1.0,
        }));
    }
    let mut b = a.clone();
    a.sort_by(|a, b| {
        a.x.partial_cmp(&b.x).unwrap()
    });

    b.sort_by(|a, b| {
        a.y.partial_cmp(&b.y).unwrap()
    });
    println!("{:?}", a);
    println!("{:?}", b);
}
