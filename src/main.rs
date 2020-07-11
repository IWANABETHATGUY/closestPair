use std::time::Instant;

pub struct RoundItem {
    x: f32,
    y: i32,
    r: i32,
    // color: String,
}
fn main() {
    // let a = std::mem::size_of::<RoundItem>();
   let mut a = vec![];
   for i in ( 0..200000000 ).rev() {
    a.push(i);
   }

   let start = Instant::now();
   a.sort();
   println!("{:?}", start.elapsed());

}
