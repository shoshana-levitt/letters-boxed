const fs = require("fs");

function solve(sides) {
  const words = [];
  let solutions = [];
  const letters = sides.join("");
  try {
    const fileContent = fs.readFileSync("words.txt", "utf-8");
    const lines = fileContent.split("\n");
    for (const line of lines) {
      if (line.length > 0 && [...line].every((x) => letters.includes(x))) {
        words.push(line);
      }
    }
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }

  function getSide(letter) {
    for (let i = 0; i < 4; i++) {
      if (sides[i].includes(letter)) {
        return i;
      }
    }
  }

  function isValid(word) {
    return [...word].every((_, i) => getSide(word[i]) !== getSide(word[i + 1]));
  }

  const validWordsSorted = words
    .filter(isValid)
    .sort((a, b) => new Set(a).size - new Set(b).size);

  function remainingLetters(firstWord) {
    return new Set(
      [...letters].filter((letter) => !firstWord.includes(letter))
    );
  }

  function connectsWith(word1, word2) {
    return (
      word1[0] === word2[word2.length - 1] ||
      word1[word1.length - 1] === word2[0]
    );
  }

  function validSecondWords(firstWord) {
    return validWordsSorted.filter(
      (word) =>
        connectsWith(firstWord, word) &&
        [...remainingLetters(firstWord)].every((letter) =>
          word.includes(letter)
        )
    );
  }

  validWordsSorted.forEach((word) => {
    vsw = validSecondWords(word);
    if (vsw.length > 0 && word.localeCompare(vsw[0]) === -1) {
      solutions.push([word, vsw[0]]);
    }
  });

  return solutions;
}

console.log(solve(["kdo", "iyl", "ear", "hwn"]));
