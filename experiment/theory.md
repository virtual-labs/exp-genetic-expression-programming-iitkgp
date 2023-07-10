## Introduction

Genetic Expression Programming (GEP) is an evolutionary algorithm that automatically creates computer programs. These computer programs can take many forms: they can be conventional mathematical models, neural networks, decision trees, sophisticated nonlinear models, logistic nonlinear regressors, nonlinear classifiers, complex polynomial structures, logic circuits and expressions, and so on. But irrespective of their complexity, all GEP programs are encoded in very simple linear structures - the chromosomes. These chromosomes are special because, no matter what, they always encode a valid computer program. So we can mutate them and then select the best ones to reproduce and then create more programs and so on, endlessly. This is, of course, one of the prerequisites for having a system evolving efficiently, searching for better and better solutions as it tries to solve a particular problem.

## Theory

Genetic expression programming (GEP) is an evolutionary algorithm that creates computer programs or models. These computer programs are complex tree structures that learn and adapt by changing their sizes, shapes, and composition, much like a living organism. And like living organisms, the computer programs of GEP are also encoded in simple linear chromosomes of fixed length. Thus, GEP is a genotype-phenotype system, benefiting from a simple genome to keep and transmit the genetic information and a complex phenotype to explore the environment and adapt to it.

**Encoding the Genotype**: 
The genome of gene expression programming consists of a linear, symbolic string or chromosome of fixed length composed of one or more genes of equal size. These genes, despite their fixed length, code for expression trees of different sizes and shapes. An example of a chromosome with two genes, each of size 9, is the string (position zero indicates the start of each gene):
012345678012345678
L+a-baccd**cLabacd
where "L" represents the natural logarithm function and "a", "b", "c", and "d" represent the variables and constants used in a problem.
The fundamental steps of the basic gene expression algorithm are listed below in pseudocode:

1. Select function set
2. Select terminal set
3. Load dataset for fitness evaluation
4. Create chromosomes of initial population randomly
5. For each program in population:
    - Express chromosome
    - Execute program
    - Evaluate fitness
6. Verify stop condition
7. Select programs
8. Replicate selected programs to form the next population
9. Modify chromosomes using genetic operators
10. Go to step 5.

The first four steps prepare all the ingredients that are needed for the iterative loop of the algorithm (steps 5 through 10). Of these preparative steps, the crucial one is the creation of the initial population, which is created randomly using the elements of the function and terminal sets.
