#![feature(test)]

extern crate closest_pair;
extern crate test;
#[bench]
fn universe_ticks(b: &mut test::Bencher) {
    let mut universe = closest_pair::RoundCanvas::new(1200, 1200, 10.0, 30);

    b.iter(|| {
        universe.tick();
        universe.closest_pair_dc();
    });
}

