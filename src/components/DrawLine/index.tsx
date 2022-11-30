import {useEffect, useRef} from 'react';
import { DELAY } from 'helpers';

type DrawLineType = {
  winningCombo: number[];
  gridSize: number;
  boxesRef: HTMLDivElement[] | null[];
};

/**
 * Draws the diagonal/vertical/horizontal line
 * when a user wins
 * @returns JSX.Element
 */
export default function DrawLine({
  winningCombo,
  gridSize,
  boxesRef,
}: DrawLineType) {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const prevGridSize = useRef<number>(0);

  useEffect(() => {
    prevGridSize.current = gridSize;
  }, [gridSize]);

  useEffect(() => {
    if (lineRef.current && winningCombo.length) {
      const firstBoardIndex = winningCombo[0];
      const secondBoardIndex = winningCombo[1];

      // determine the line direction
      const isDiagonal =
        firstBoardIndex === 0
          ? secondBoardIndex - prevGridSize.current - 1 === firstBoardIndex
          : secondBoardIndex - prevGridSize.current + 1 === firstBoardIndex;
      const isVertical =
        firstBoardIndex + prevGridSize.current === secondBoardIndex;
      let box = boxesRef[firstBoardIndex];

      if (box) {
        const {top, left, height, width} = box?.getBoundingClientRect();
        lineRef.current.style.top = `${top}px`;
        lineRef.current.style.transformOrigin = 'top left';
        if (isDiagonal) {
          if (firstBoardIndex === 0) {
            lineRef.current.style.left = `${left}px`;
            lineRef.current.style.transform = 'rotate(45deg)';
          } else {
            lineRef.current.style.left = `${left + width}px`;
            lineRef.current.style.transform = 'rotate(-225deg)';
          }

          // using pythagoras theorem to calculate the height of the line
          let result = Math.pow(width, 2) + Math.pow(height, 2);
          result = Math.sqrt(result);
          lineRef.current.style.width = `${result * prevGridSize.current}px`;
        } else if (isVertical) {
          lineRef.current.style.left = `${left + width / 2}px`;
          lineRef.current.style.transform = 'rotate(90deg)';
          lineRef.current.style.width = `${height * prevGridSize.current}px`;
        } else {
          lineRef.current.style.left = `${left}px`;
          lineRef.current.style.top = `${top + height / 2}px`;
          lineRef.current.style.width = `${width * prevGridSize.current}px`;
        }
        setTimeout(() => {
          if (lineRef.current) {
            lineRef.current.style.top = '0';
            lineRef.current.style.left = '0';
            lineRef.current.style.width = '0';
            lineRef.current.style.transform = '';
          }
        }, DELAY);
      }
    }
  }, [winningCombo, boxesRef]);

  return <div className="line" ref={lineRef}></div>;
}
