/**
 * Generates all possible vertical winning combinations.
 * @param indexValue
 * @param rowSize
 * @returns an array
 */
function getVerticalCombo(indexValue: number, rowSize: number) {
  const results = [];
  const reversedResults = [];
  let value = indexValue;
  do {
    results.push(value);
    reversedResults.unshift(value);
    value += rowSize;
  } while (results.length < rowSize);
  return [results, reversedResults];
}
/**
 * Generate all possible diagonal winning combinations
 * @param indexValue
 * @param rowSize
 * @returns an array
 */
function getDiagonalCombo(indexValue: number, rowSize: number) {
  const results = [];
  const reversedResults = [];
  let value = indexValue;
  const diff = indexValue === 0 ? rowSize + 1 : rowSize - 1;
  do {
    results.push(value);
    reversedResults.unshift(value);
    value += diff;
  } while (results.length < rowSize);
  return [results, reversedResults];
}
/**
 * Generates a list of possible winning combinations based on the grid sizes
 * @param rowSize number
 * @returns an array
 */
export function generateWinningCombination(rowSize: number) {
  const placeHolder = Array.from(Array(rowSize).keys());
  const allCombinations = [];
  let results = [];
  if (rowSize) {
    for (let idx = 0; idx < rowSize; idx++) {
      // compute the horizontal combination
      if (idx === 0) {
        for (let idy = 0; idy < Math.pow(rowSize, 2); idy += rowSize) {
          results = placeHolder.map((v) => v + idy);
          allCombinations.push(results);
          allCombinations.push([...results].reverse());
        }
      }
      // compute vertical combination starting from the first row
      results = getVerticalCombo(idx, rowSize);
      allCombinations.push(...results);
      //   compute diagonal combination starting from the top left and right corner
      if (idx === 0 || rowSize === idx + 1) {
        results = getDiagonalCombo(idx, rowSize);
        allCombinations.push(...results);
      }
    }
  }
  return allCombinations;
}

/**
 * Generates an array that contains a placeholder string
 * @param gridSize
 * @returns an array
 */
export const generateBoard = (gridSize: number): string[] =>
  Array.from({length: gridSize * gridSize}).map((_) => '');


export const DELAY = 1500;
