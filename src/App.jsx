import './App.css';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import Square from './components/Square';
import { TURNS } from './data/constants';
import { checkWinner, checkEndGame, loadBoard, loadTurn } from './logic/board';
import WinnerSection from './components/WinnerSection';

function App() {
  const [board, setboard] = useState(loadBoard());
  const [turn, setturn] = useState(loadTurn);
  //Winner if it is null there is no winner however if it is false there is a tie
  const [winner, setwinner] = useState(null);

  const updateBoard = (index) => {
    // if we have no value in the board position we return
    if (board[index] || winner) return;
    //We always create a new board so we dont modify the other one unnecesarily
    const newBoard = [...board];
    newBoard[index] = turn;

    setboard(newBoard);

    //We update the current turn to the next one
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setturn(newTurn);
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', JSON.stringify(newTurn));
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      // in a set Function we can have a parameter that is the previous state
      setwinner((prevWinner) => {
        console.log(
          `${prevWinner} is the previous winner and ${newWinner} is the new one`
        );
        confetti();
        return newWinner; // this is another way of updating the state
      });
      // the state update is not sincronous so thats why if you show an alert of the winner here the result wont render on the screen
    } else if (!checkEndGame(newBoard)) {
      setwinner(false);
    }
  };

  const resetGame = () => {
    setboard(Array(9).fill(null));
    setturn(TURNS.X);
    setwinner(null);
    localStorage.removeItem('board');
    localStorage.removeItem('turn');
  };

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <section className='game'>
          {board.map((c, index) => {
            return (
              <Square updateBoard={updateBoard} key={index} index={index}>
                {c}
              </Square>
            );
          })}
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
          <button onClick={resetGame}>Reset Game</button>
        </section>
        {winner !== null && (
          <WinnerSection winner={winner} resetGame={resetGame}></WinnerSection>
        )}
      </main>
    </>
  );
}

export default App;
