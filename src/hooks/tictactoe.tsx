import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {generateWinningCombination, generateBoard, DELAY} from 'helpers';
import {Notice, NoticeTypeEnum, Player} from 'types';

type Props = {
  gridSize?: number;
};

type UseTicTacToeType = {
  noticeBoard: Notice;
  board: string[];
  onPlay: (boardIndex: number) => void;
  players: Player[];
  winningCombo: number[];
};

export default function useTicTacToe({gridSize = 3}: Props): UseTicTacToeType {
  const [board, updateBoard] = useState<string[]>([]);
  const [winningCombo, setWinningCombo] = useState<number[]>([]);
  const [noticeBoard, updateNoticeBoard] = useState<Notice>({title: ''});

  const turns = useRef<number>(0);
  const players = useRef<Player[]>([]);

  const combinations = useMemo<number[][]>(
    () => generateWinningCombination(gridSize),
    [gridSize],
  );

  const resetBoard = useCallback(() => {
    const newBoard = generateBoard(gridSize);
    updateBoard(newBoard);
    updateNoticeBoard({
      type: NoticeTypeEnum.info,
      title: `Player ${turns.current + 1} turn`,
    });
    localStorage.setItem(
      'gameData',
      JSON.stringify({
        players: players.current,
        board: newBoard,
        turns: turns.current,
      }),
    );
  }, [gridSize]);

  const checkForTie = useCallback(() => {
    const isEmptyBoard = board.filter((item) => item === '').length === 0;
    if (isEmptyBoard) {
      updateNoticeBoard({
        type: NoticeTypeEnum.warning,
        title: `Player ${turns.current + 1} turn`,
      });
      return true;
    }
    return false;
  }, [board]);

  const checkForWin = useCallback(
    (currentPlayer: Player) => {
      let gameWon = false;
      let plays = board.reduce<number[]>(
        (accumulator, icon, value) =>
          icon === currentPlayer?.icon
            ? accumulator.concat(value)
            : accumulator,
        [],
      );
      for (let [_, combination] of combinations.entries()) {
        if (combination.every((elem) => plays.indexOf(elem) > -1)) {
          currentPlayer.score = currentPlayer.score + 1;
          gameWon = true;
          setWinningCombo(
            combination.filter((elem) => plays.indexOf(elem) > -1),
          );
          // declare winner
          updateNoticeBoard({
            type: NoticeTypeEnum.warning,
            title: `Player ${turns.current + 1} won🎊`,
          });
          break;
        }
      }
      return gameWon;
    },
    [board, combinations],
  );

  useEffect(() => {
    // sync local storage data.
    const data = JSON.parse(localStorage.getItem('gameData') || '');
    players.current = data.players || [
      {
        id: 0,
        name: 'Player 1',
        icon: 'X',
        score: 0,
        boardSelections: [],
      },
      {
        id: 1,
        name: 'Player 2',
        icon: 'O',
        score: 0,
        boardSelections: [],
      },
    ];
    turns.current = data.turns;
    if (data.board && !data.board.length) {
      updateBoard(data.board);
    }
    updateNoticeBoard({
      type: NoticeTypeEnum.info,
      title: `Player ${turns.current + 1} turn`,
    });
  }, []);

  useEffect(() => {
    updateBoard(generateBoard(gridSize));
  }, [gridSize]);

  useEffect(() => {
    // if the board is not empty
    if (board.findIndex((item) => item !== '') > -1) {
      const currentPlayer = players.current[turns.current];
      if (!checkForWin(currentPlayer) && !checkForTie()) {
        localStorage.setItem(
          'gameData',
          JSON.stringify({
            players: players.current,
            board,
            turns: turns.current,
          }),
        );
        turns.current = turns.current === 0 ? turns.current + 1 : 0;
        updateNoticeBoard({
          type: NoticeTypeEnum.info,
          title: `Player ${turns.current + 1} turn`,
        });
      } else {
        setTimeout(() => {
          resetBoard();
        }, DELAY);
      }
    }
  }, [board, turns, checkForWin, checkForTie, resetBoard]);

  const onPlay = useCallback(
    (boardIndex: number) => {
      const player = players.current[turns.current];
      if (board[boardIndex].length) return false;
      const cloneBoard = [...board];
      cloneBoard[boardIndex] = player?.icon;
      updateBoard(cloneBoard);
    },
    [board, players, turns],
  );

  return {
    noticeBoard,
    board,
    onPlay,
    players: players.current,
    winningCombo,
  };
}
