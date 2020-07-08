
pub struct RoundItem {
    x: f32,
    y: f32,
    r: i32,
    // color: String,
    speed_x: f32,
    speed_y: f32,
}
fn main() {
    let a = std::mem::size_of::<RoundItem>();
    println!("{}", a);
    
}