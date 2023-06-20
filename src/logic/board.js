import { TURNS, WINNER_COMBOS } from '../data/constants';
export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[b] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (boardToCheck) => {
  // if the new board includes null return true however if returns false it enters the if else on the function updateBoard() and then sets the winner to false that is the tie situation
  return boardToCheck.includes(null);
  //return boardTocheck.every((square) => square !== null)
  //This is an alternative option where we check all the positions if all of them are different from null it will return true
};

export const loadBoard = () => {
  return JSON.parse(localStorage.getItem('board')) || Array(9).fill(null);
};

export const loadTurn = () => {
  return JSON.parse(localStorage.getItem('turn')) || TURNS.X;
};
