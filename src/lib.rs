mod utils;

extern crate wasm_bindgen;

// use serde::Deserialize;
use wasm_bindgen::prelude::*;
#[macro_use]
// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
// #[derive(Serialize, Deserialize)]
// struct Point {
//     x: f32,
//     y: f32,
//     i: i32,
// }
// }function closestPair(roundList) {
//   let res = [0, 1];
//   const [a, b] = res;
//   let closestDistance = Math.sqrt(
//     (roundList[a].x - roundList[b].x) ** 2 +
//       (roundList[a].y - roundList[b].y) ** 2
//   );
//   for (let i = 0; i < roundList.length; i++) {
//     for (let j = i + 1; j < roundList.length; j++) {
//       let distance = Math.sqrt(
//         (roundList[i].x - roundList[j].x) ** 2 +
//           (roundList[i].y - roundList[j].y) ** 2
//       );
//       if (distance < closestDistance) {
//         res = [i, j];
//         closestDistance = distance;
//       }
//     }
//   }
//   return res;
// }
fn distance(a: &RoundItem, b: &RoundItem) -> f32 {
    let x = a.x - b.x;
    let y = a.y - b.y;
    (x * x + y * y).sqrt()
}
// #[wasm_bindgen]
// pub fn calculate(points: &js_sys::Array) -> i32 {
//     let points: Vec<i32> = points.into_serde().unwrap();
//     let mut res = [0, 1];
//     let mut closestDistance = distance(&points[0], &points[1]);
//     for (ii, ip) in points.iter().enumerate() {
//         for (ji, jp) in points.iter().enumerate().skip(ii + 1) {
//             let distance = distance(ip, jp);
//             if distance < closestDistance {
//                 res = [ii, ji];
//                 closestDistance = distance;
//             }
//         }
//     }
//     res[0] as i32
// }

// class RoundItem {
//   constructor(index, x, y, speedX, speedY) {
//     this.index = index;
//     this.x = x;
//     this.y = y;
//     this.speedX = speedX;
//     this.speedY = speedY;
//     this.r = RADIUS;
//     this.color = STROKE_COLOR;
//   }
//   draw(fill) {
//     ctx.strokeStyle = this.color;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
//     ctx.closePath();
//     ctx.stroke();
//     if (fill) {
//       ctx.fill();
//     }
//   }
// }
#[wasm_bindgen]
pub struct RoundItem {
    x: f32,
    y: f32,
    r: f32,
    speed_x: f32,
    speed_y: f32,
}
#[wasm_bindgen]
pub struct RoundCanvas {
    width: i32,
    height: i32,
    r: f32,
    count: usize,
    roundList: Vec<RoundItem>,
    max_x: f32,
    max_y: f32,
}
fn in_area(x: f32, y: f32, r: f32, height: f32, width: f32) -> u8 {
    let res = 0 | (y - r >= 0.0 && y + r <= height) as u8;
    return (res << 1) | (x - r >= 0.0 && x + r <= width) as u8;
}
#[wasm_bindgen]
impl RoundCanvas {
    // function closestPairBrute(roundList) {
    //   let res = [0, 1];
    //   const [a, b] = res;
    //   let closestDistance = Math.sqrt(
    //     (roundList[a].x - roundList[b].x) ** 2 +
    //       (roundList[a].y - roundList[b].y) ** 2
    //   );
    //   for (let i = 0; i < roundList.length; i++) {
    //     for (let j = i + 1; j < roundList.length; j++) {
    //       let distance = Math.sqrt(
    //         (roundList[i].x - roundList[j].x) ** 2 +
    //           (roundList[i].y - roundList[j].y) ** 2
    //       );
    //       if (distance < closestDistance) {
    //         res = [i, j];
    //         closestDistance = distance;
    //       }
    //     }
    //   }
    //   return res;
    // }
    pub fn closest_pair_brute(&self) -> Vec<usize> {
        let mut res = vec![0, 1];
        let round_list = &self.roundList;
        let mut closest_distance = distance(&round_list[0], &round_list[1]);
        for (ii, ip) in round_list.iter().enumerate() {
            for (ji, jp) in round_list.iter().enumerate().skip(ii + 1) {
                let distance = distance(ip, jp);
                if distance < closest_distance {
                    res = vec![ii, ji];
                    closest_distance = distance;
                }
            }
        }
        res
    }
    pub fn tick(&mut self) {
        let max_x = self.max_x;
        let max_y = self.max_y;
        let r = self.r;
        let height = self.height as f32;
        let width = self.width as f32;
        for item in self.roundList.iter_mut() {
            let next_x = item.x + item.speed_x;
            let next_y = item.y + item.speed_y;
            item.x = if next_x < r {
                r
            } else if next_x > max_x {
                max_x
            } else {
                next_x
            };
            item.y = if next_y < r {
                r
            } else if next_y > max_y {
                max_y
            } else {
                next_y
            };
            let flag = in_area(next_x, next_y, r, height, width);
            if (flag & 1) != 1 {
                item.speed_x *= -1.0;
            }
            if ((flag >> 1) & 1) != 1 {
                item.speed_y *= -1.0;
            }
        }
    }

    pub fn new(width: i32, height: i32, r: f32, count: usize) -> RoundCanvas {
        let mut roundList = vec![];
        let max_x = width as f32 - r;
        let max_y = height as f32 - r;
        for i in 0..count {
            let x = clamp(max_x, r, (js_sys::Math::random() * width as f64) as f32) as f32;
            let y = clamp(max_y, r, (js_sys::Math::random() * height as f64) as f32) as f32;
            let x_direction = if js_sys::Math::random() > 0.5 { 1 } else { -1 };
            let y_direction = if js_sys::Math::random() > 0.5 { 1 } else { -1 };
            let speed_x = (js_sys::Math::random() * 1.0 + 0.5) as f32 * x_direction as f32;
            let speed_y = (js_sys::Math::random() * 1.0 + 0.5) as f32 * y_direction as f32;
            roundList.push(RoundItem {
                r,
                speed_x,
                speed_y,
                x,
                y,
            });
        }
        RoundCanvas {
            width,
            height,
            r,
            count,
            roundList,
            max_x,
            max_y,
        }
    }

    pub fn rounds(&self) -> *const RoundItem {
        self.roundList.as_ptr()
    }
}

fn clamp<T: PartialEq + PartialOrd>(upbound: T, lowbound: T, value: T) -> T {
    if value < lowbound {
        lowbound
    } else if value > upbound {
        upbound
    } else {
        value
    }
}
