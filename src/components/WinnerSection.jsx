import Square from './Square';

function WinnerSection({ winner, resetGame }) {
  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winner === false ? 'Its a Tie' : `Winner is ${winner}`}</h2>
        <header className='win'>{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={resetGame}>Start again</button>
        </footer>
      </div>
    </section>
  );
}

export default WinnerSection;
