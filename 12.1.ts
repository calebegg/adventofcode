import { readFile } from "fs";

interface Node {
  adj: Node[];
  name: string;
}

readFile("12.txt", (err, data) => {
  const nodes = new Map<string, Node>();
  const lines = data.toString().split("\n");
  for (const [a, b] of lines.map((l) => l.split("-"))) {
    let nodeA = nodes.get(a);
    if (!nodeA) {
      nodeA = { name: a, adj: [] };
      nodes.set(a, nodeA);
    }
    let nodeB = nodes.get(b);
    if (!nodeB) {
      nodeB = { name: b, adj: [] };
      nodes.set(b, nodeB);
    }
    nodeA.adj.push(nodeB);
    nodeB.adj.push(nodeA);
  }

  let trips = 0;
  function traverse(node: Node, path: string[]) {
    if (node.name.match(/[a-z]/) && path.includes(node.name)) return;
    path = [...path, node.name];
    if (node.name === "end") trips++;
    for (const child of node.adj) traverse(child, path);
  }
  traverse(nodes.get("start")!, []);
  console.log(trips);
});
