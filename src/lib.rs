mod utils;

extern crate serde_json;
extern crate wasm_bindgen;

use serde::Deserialize;
use wasm_bindgen::prelude::*;
#[macro_use]
extern crate serde_derive;
// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
#[derive(Serialize, Deserialize)]
struct Point {
    x: f32,
    y: f32,
    i: i32,
}
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
fn distance(a: &Point, b: &Point) -> f32 {
    ((a.x - b.x).powi(2) + (a.y - b.y).powi(2)).sqrt()
}
#[wasm_bindgen]
pub fn calculate(points: &JsValue) -> i32 {
    let points: Vec<Point> = points.into_serde().unwrap();
    let mut res = [0, 1];
    let mut closestDistance = distance(&points[0], &points[1]);
    for (ii, ip) in points.iter().enumerate() {
        for (ji, jp) in points.iter().enumerate().skip(ii + 1) {
            let distance = distance(ip, jp);
            if distance < closestDistance {
                res = [ii, ji];
                closestDistance = distance;
            }
        }
    }
    res[0] as i32
}
