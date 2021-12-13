import { readFile } from "fs";

readFile("2015/7.txt", (err, data) => {
  const exprs = new Map<string, () => number>();
  const vals = new Map<string, number>();
  function get(term: string) {
    if (term.match(/^\d+$/)) return +term;
    if (vals.has(term)) return vals.get(term)!;
    const val = exprs.get(term)!();
    vals.set(term, val);
    return val;
  }
  for (const line of data.toString().split("\n")) {
    const [term, output] = line.split(" -> ");
    if (term.match(/^\d+$/)) {
      exprs.set(output, () => +term);
    } else if (term.match(/^[a-z]+$/)) {
      exprs.set(output, () => get(term));
    } else if (term.startsWith("NOT")) {
      exprs.set(output, () => ~get(term.substring(4)) & 0xffff);
    } else {
      const [l, oper, r] = term.split(" ");
      switch (oper) {
        case "LSHIFT":
          exprs.set(output, () => get(l) << +r);
          break;
        case "RSHIFT":
          exprs.set(output, () => get(l) >> +r);
          break;
        case "AND":
          exprs.set(output, () => get(l) & get(r));
          break;
        case "OR":
          exprs.set(output, () => get(l) | get(r));
          break;
      }
    }
  }
  const a = exprs.get("a")!();
  exprs.set("b", () => a);
  vals.clear();
  console.log(exprs.get("a")!());
});
