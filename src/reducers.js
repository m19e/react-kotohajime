import { combineReducers } from "redux";
import { CLICK_SQUARE, JUMP_TO_PAST, MAKE_UP_GAME } from "./actions";
import { act } from "react-dom/test-utils";

const initialState = {
    history: [
        {
            squares: Array(9).fill(null),
        },
    ],
    stepNumber: 0,
    xIsNext: true,
};

function game(state = initialState, action) {
    switch (action.type) {
        case CLICK_SQUARE:
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[action.index]) {
                return;
            }
            squares[action.index] = this.state.xIsNext ? "X" : "O";
            return {
                history: history.concat([
                    {
                        squares: squares,
                    },
                ]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            };

        case JUMP_TO_PAST:
            return {
                ...state,
                stepNumber: action.step,
                xIsNext: !state.xIsNext,
            };

        case MAKE_UP_GAME:
            return initialState;

        default:
            return state;
    }
}

export const app = combineReducers({ game });

// ==========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const i in lines) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
