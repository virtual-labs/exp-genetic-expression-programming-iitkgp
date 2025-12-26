/*************************************************
 STEP 1: SELECT FUNCTION SET
*************************************************/
const FUNCTIONS = {
  "+": { arity: 2, fn: (a, b) => a + b },
  "-": { arity: 2, fn: (a, b) => a - b },
  "*": { arity: 2, fn: (a, b) => a * b }
};

/*************************************************
 STEP 2: SELECT TERMINAL SET
*************************************************/
const TERMINALS = ["x", 1];

/*************************************************
 STEP 3: LOAD DATASET FOR FITNESS EVALUATION
*************************************************/
const dataset = [
  { x: 1, y: 3 },
  { x: 2, y: 5 },
  { x: 3, y: 7 }   // target: y = 2x + 1
];

/*************************************************
 GEP PARAMETERS
*************************************************/
const POP_SIZE = 30;
const GENERATIONS = 40;
const HEAD_LEN = 5;
const TAIL_LEN = HEAD_LEN + 1;
const CHROM_LEN = HEAD_LEN + TAIL_LEN;
const MUT_RATE = 0.1;

/*************************************************
 STEP 4: CREATE INITIAL POPULATION RANDOMLY
*************************************************/
function randomChromosome() {
  let c = [];
  for (let i = 0; i < HEAD_LEN; i++)
    c.push(Math.random() < 0.5 ? randKey(FUNCTIONS) : rand(TERMINALS));
  for (let i = 0; i < TAIL_LEN; i++)
    c.push(rand(TERMINALS));
  return c;
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randKey(obj) {
  return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}

/*************************************************
 STEP 5 & 6: EXPRESS CHROMOSOME → TREE
*************************************************/
function expressChromosome(chrom) {
  let i = 0;
  function build() {
    let g = chrom[i++];
    if (FUNCTIONS[g]) {
      return { val: g, left: build(), right: build() };
    }
    return { val: g };
  }
  return build();
}

/*************************************************
 STEP 7: EXECUTE PROGRAM
*************************************************/
function execute(tree, x) {
  if (!tree.left) return tree.val === "x" ? x : tree.val;
  return FUNCTIONS[tree.val].fn(
    execute(tree.left, x),
    execute(tree.right, x)
  );
}

/*************************************************
 STEP 8: EVALUATE FITNESS
*************************************************/
function fitness(chrom) {
  let tree = expressChromosome(chrom);
  let error = 0;
  dataset.forEach(d => {
    error += Math.abs(d.y - execute(tree, d.x));
  });
  return 1 / (1 + error);
}

/*************************************************
 STEP 10 & 11: SELECTION + REPLICATION
*************************************************/
function select(pop) {
  pop.sort((a, b) => fitness(b) - fitness(a));
  return pop.slice(0, POP_SIZE / 2);
}

/*************************************************
 STEP 12: GENETIC OPERATORS (MUTATION)
*************************************************/
function mutate(chrom) {
  return chrom.map((g, i) => {
    if (Math.random() < MUT_RATE) {
      return i < HEAD_LEN
        ? (Math.random() < 0.5 ? randKey(FUNCTIONS) : rand(TERMINALS))
        : rand(TERMINALS);
    }
    return g;
  });
}

/*************************************************
 MAIN LOOP — FOLLOWS THE ALGORITHM EXACTLY
*************************************************/
function runGEP() {

  // Step 4
  let population = Array.from({ length: POP_SIZE }, randomChromosome);

  for (let gen = 0; gen < GENERATIONS; gen++) {

    // Step 5–8
    let best = population.reduce((a, b) => fitness(a) > fitness(b) ? a : b);

    // Step 9: Stop condition
    if (fitness(best) > 0.99) break;

    // Step 10
    let selected = select(population);

    // Step 11
    let nextPop = [...selected];

    // Step 12
    while (nextPop.length < POP_SIZE) {
      let parent = rand(selected);
      nextPop.push(mutate([...parent]));
    }

    population = nextPop;
  }

  let best = population.reduce((a, b) => fitness(a) > fitness(b) ? a : b);

  document.getElementById("output").textContent =
    "Best Chromosome:\n" + best.join(" ") +
    "\nFitness: " + fitness(best).toFixed(4);
}
