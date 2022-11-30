import {ChangeEvent, useRef, useState} from 'react';

// components
import DrawLine from 'components/DrawLine';

// hooks
import useTicTacToe from 'hooks/tictactoe';

function Board() {
  const [gridSize, setGridSize] = useState(3);
  const {winningCombo, noticeBoard, board, onPlay, players} = useTicTacToe({
    gridSize,
  });
  const boxesRef = useRef<HTMLDivElement[] | null[]>([]);
  const handleGridLayoutChange = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const {value} = target;
    setGridSize(Number(value));
  };

  return (
    <div className="d-flex flex-column min-height-100">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <select
          className="form-select mb-4 w-50 form-select-lg cursor-pointer"
          aria-label="Select grid size"
          onChange={handleGridLayoutChange}
        >
          <option value="3">3 x 3</option>
          <option value="4">4 x 4</option>
          <option value="5">5 x 5</option>
          <option value="6">6 x 6</option>
        </select>
        <p className="display-4 text-white mb-0">
          {players[0]?.score || 0} - {players[1]?.score || 0}
        </p>
        <br />
      </div>
      {noticeBoard ? (
        <div
          className={`alert alert-${
            noticeBoard.type || 'info'
          } text-center h5 w-md-50 mx-auto`}
          role="alert"
        >
          {noticeBoard.title}
        </div>
      ) : null}
      <div
        className="board grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {board.map((boardValue, boardIndex) => (
          <div
            key={boardIndex}
            className="box"
            data-value={boardValue}
            onClick={() => onPlay(boardIndex)}
            ref={(elem) => (boxesRef.current[boardIndex] = elem)}
          >
            {boardValue}
          </div>
        ))}
      </div>
      <DrawLine
        winningCombo={winningCombo}
        gridSize={gridSize}
        boxesRef={boxesRef.current}
      />
    </div>
  );
}

export default Board;
