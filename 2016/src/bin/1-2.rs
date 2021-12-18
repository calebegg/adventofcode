use std::collections::HashSet;
use std::fs;
use std::process::exit;

const DIRS: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];

fn main() {
    let contents = fs::read_to_string("src/1.txt").expect("File not found");
    let mut x = 0;
    let mut y = 0;
    let mut dir = 0;
    let mut visited = HashSet::new();
    visited.insert((0, 0));
    for s in contents.split(", ") {
        if s.starts_with("R") {
            if dir == 3 {
                dir = 0
            } else {
                dir += 1;
            }
        } else {
            if dir == 0 {
                dir = 3;
            } else {
                dir -= 1;
            }
        }
        let amount = s
            .get(1..)
            .expect("No amount")
            .parse::<i32>()
            .expect("Can't parse amount");

        for _i in 0..amount {
            x += DIRS[dir].0;
            y += DIRS[dir].1;

            if visited.contains(&(x, y)) {
                println!("{}", x.abs() + y.abs());
                exit(0);
            }

            visited.insert((x, y));
        }
    }
}
