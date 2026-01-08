function parseChromosome(input) {
  let genes = input.trim().split(/\s+/);

  if (genes.length !== CHROM_LEN) {
    throw new Error(
      `Chromosome length must be ${CHROM_LEN}, got ${genes.length}`
    );
  }

  // validate head
  for (let i = 0; i < HEAD_LEN; i++) {
    if (!(genes[i] in FUNCTIONS) && !TERMINALS.includes(parseGene(genes[i]))) {
      throw new Error(`Invalid gene in head: ${genes[i]}`);
    }
  }

  // validate tail (terminals only)
  for (let i = HEAD_LEN; i < CHROM_LEN; i++) {
    if (!TERMINALS.includes(parseGene(genes[i]))) {
      throw new Error(`Invalid gene in tail: ${genes[i]}`);
    }
  }

  return genes.map(parseGene);
}

function parseGene(g) {
  return g === "x" ? "x" : isNaN(g) ? g : Number(g);
}


function runGEP(useUserChrom = false) {

  let population = [];

  if (useUserChrom) {
    try {
      let userChrom = parseChromosome(
        document.getElementById("chromInput").value
      );

      // seed population with user chromosome
      population.push(userChrom);

      // fill rest randomly
      while (population.length < POP_SIZE) {
        population.push(randomChromosome());
      }

    } catch (e) {
      alert(e.message);
      return;
    }
  } else {
    population = Array.from({ length: POP_SIZE }, randomChromosome);
  }

  for (let gen = 0; gen < GENERATIONS; gen++) {

    let best = population.reduce((a, b) =>
      fitness(a) > fitness(b) ? a : b
    );

    if (fitness(best) > 0.99) break;

    let selected = select(population);
    let nextPop = [...selected];

    while (nextPop.length < POP_SIZE) {
      let parent = rand(selected);
      nextPop.push(mutate([...parent]));
    }

    population = nextPop;
  }

  let best = population.reduce((a, b) =>
    fitness(a) > fitness(b) ? a : b
  );

  document.getElementById("output").textContent =
    "Best Chromosome:\n" + best.join(" ") +
    "\nFitness: " + fitness(best).toFixed(4);
}
