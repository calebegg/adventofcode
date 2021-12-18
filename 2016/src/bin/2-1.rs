use std::fs;

const KEYPAD: [[i32; 3]; 3] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

fn main() {
    let contents = fs::read_to_string("src/2.txt").expect("File not found");
    let mut r = 1;
    let mut c = 1;
    for line in contents.split("\n") {
        for ch in line.chars() {
            if (ch == 'U') && (r > 0) {
                r -= 1;
            }
            if (ch == 'D') && (r < 2) {
                r += 1;
            }
            if (ch == 'L') && (c > 0) {
                c -= 1;
            }
            if (ch == 'R') && (c < 2) {
                c += 1;
            }
        }
        print!("{}", KEYPAD[r][c])
    }
    println!("")
}
