// ================= FUNCTION SET =================
const FUNCTIONS = {
  "+": { arity: 2, fn: (a, b) => a + b },
  "-": { arity: 2, fn: (a, b) => a - b },
  "*": { arity: 2, fn: (a, b) => a * b },
  "L": { arity: 1, fn: a => Math.log(a) }
};

// ================= CHROMOSOME =================
const chromosome = "L+a-baccd**cLabacd";
const GENE_SIZE = 9;

const gene1 = chromosome.slice(0, 9).split("");
const gene2 = chromosome.slice(9).split("");

// ================= BUILD EXPRESSION TREE =================
function buildTree(gene) {
  let i = 0;
  function parse() {
    const s = gene[i++];
    if (FUNCTIONS[s]) {
      return {
        val: s,
        children: Array.from(
          { length: FUNCTIONS[s].arity },
          () => parse()
        )
      };
    }
    return { val: s };
  }
  return parse();
}

// ================= EXECUTE TREE =================
function execute(node, vars) {
  if (!node.children) return vars[node.val];
  const args = node.children.map(c => execute(c, vars));
  return FUNCTIONS[node.val].fn(...args);
}

// ================= DRAW TREE =================
function drawTree(root, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "14px Arial";

  function draw(node, x, y, dx) {
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillText(node.val, x - 5, y + 5);

    if (!node.children) return;

    node.children.forEach((child, i) => {
      const nx = x + (i === 0 ? -dx : dx);
      const ny = y + 60;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      draw(child, nx, ny, dx / 1.5);
    });
  }

  draw(root, canvas.width / 2, 30, 120);
}

// ================= RUN =================
const tree1 = buildTree(gene1);
const tree2 = buildTree(gene2);

// Example variable values
const vars = { a: 5, b: 3, c: 2, d: 1 };

// Multigenic linking: +
const value1 = execute(tree1, vars);
const value2 = execute(tree2, vars);
const result = value1 + value2;

document.getElementById("output").textContent =
  "Chromosome:\n" + chromosome +
  "\n\nGene 1: " + gene1.join(" ") +
  "\nGene 2: " + gene2.join(" ") +
  "\n\nGene 1 Value = " + value1.toFixed(4) +
  "\nGene 2 Value = " + value2.toFixed(4) +
  "\n\nFinal Program Value (Gene1 + Gene2) = " + result.toFixed(4);

// Draw both genes
drawTree(tree1, "gene1");
drawTree(tree2, "gene2");
