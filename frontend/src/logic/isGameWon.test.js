import { describe, expect, test } from 'vitest';
import isGameWon  from './isGameWon'; // Adjust path as needed

describe('isGameWon Function', () => {
    test('Horizontal win (Middle of Sequence)', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [2, 2, 2, 2, 0], // Winning row
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        expect(isGameWon(2, board)).toBe(true); // Play is in the middle
    });

    test('Vertical win (Middle of Sequence)', () => {
        const board = [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0], // Play lands here
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        expect(isGameWon(2, board)).toBe(true);
    });

    test('Diagonal win (Middle of Bottom Left to Top Right Sequence)', () => {
        const board = [
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0], // Play lands here
            [1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        expect(isGameWon(1, board)).toBe(true);
    });

    test('No Win (Middle of a Broken Sequence)', () => {
        const board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1], // Broken sequence (play lands at index 2)
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        expect(isGameWon(2, board)).toBe(false);
    });
});