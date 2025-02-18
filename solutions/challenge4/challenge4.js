const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a sentence: ", (sentence) => {
  const words = sentence.trim().split(/\s+/g);

  console.log(`Number of words: ${words.length}`);
  console.log(`Reversed sentence: ${words.reverse().join(" ")}`);
  console.log(`Modified sentence: ${sentence.replace(/\s+/g, "-")}`);

  rl.close();
});
