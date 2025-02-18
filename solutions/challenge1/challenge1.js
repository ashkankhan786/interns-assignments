const fs = require("fs");

// Function to evaluate expressions
function evaluateExpression(expression) {
  try {
    let sanitizedExpression = expression
      .replace(/\–/g, "-")
      .replace(/\^/g, "**")
      .replace(/[\{\[]/g, "(")
      .replace(/[\}\]]/g, ")")
      .replace(/(\d)\s*\(/g, "$1*(")
      .replace(/\)\s*(\d)/g, ")*$1")
      .replace(/\)\s*\(/g, ")*(");

    return eval(sanitizedExpression);
  } catch (error) {
    return "Error";
  }
}

// Read input file and process expressions
function processFile(inputFile, outputFile) {
  const lines = fs
    .readFileSync(inputFile, "utf8")
    .split("\n")
    .map((line) => line.trim());

  const results = lines.map((line) => {
    const match = line.match(/(.*)=\s*$/);
    if (!match) return line; // Ignore invalid lines

    const expression = match[1].trim();
    const result = evaluateExpression(expression);
    return `${expression} = ${result}`;
  });

  fs.writeFileSync(outputFile, results.join("\n"), "utf8");
  console.log(`✅ Output saved to ${outputFile}`);
}

// Run the program
processFile("input.txt", "output.txt");
