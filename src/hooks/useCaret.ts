import { useReducer } from "react";
import type { CaretAction, CaretPosition, CaretState } from "../types/general";

const reducer = (state: CaretState, action: CaretAction) => {
    switch (action.type) {
        case "MOVE":
            return { ...state, position: {...state.position, letterId: state.position.letterId + action.delta} } as CaretState;
        case "SET":
            return { ...state, position: action.position } as CaretState;
        case "RESET":
            return { position: { letterId: 0, wordId: 0 }, refresh: state.refresh + 1} as CaretState;
        case "REFRESH":
            return { ...state, refresh: state.refresh + 1 } as CaretState;
        default:
            return state;
    }
}

const useCaret = () => {
    const [state, dispatch] = useReducer(reducer, { position: { letterId: 0, wordId: 0 }, refresh: 0 });

    const moveCaret = (delta: number) => dispatch({ type: "MOVE", delta});
    const setCaretPosition = (position: CaretPosition) => dispatch({ type: "SET", position});
    const resetCaret = () => dispatch({ type: "RESET" });
    const refreshCaret = () => dispatch({ type: "REFRESH" });

    return {state, moveCaret, setCaretPosition, resetCaret, refreshCaret};
}

export default useCaret;