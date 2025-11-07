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
        case "SET_HIDDEN":
            return { ...state, hidden: action.hidden };
        case "SET_TYPING":
            return { ...state, typing: action.typing };
        default:
            return state;
    }
}

const useCaret = () => {
    const [state, dispatch] = useReducer(reducer, { 
        position: { letterId: 0, wordId: 0 }, 
        refresh: 0, 
        hidden: true,
        typing: false
    });

    const moveCaret = (delta: number) => dispatch({ type: "MOVE", delta});
    const setCaretPosition = (position: CaretPosition) => dispatch({ type: "SET", position});
    const resetCaret = () => dispatch({ type: "RESET" });
    const refreshCaret = () => dispatch({ type: "REFRESH" });
    const setIsCaretHidden = (hidden: boolean) => dispatch({ type: "SET_HIDDEN", hidden: hidden });
    const setIsTyping = (typing: boolean) => dispatch({ type: "SET_TYPING", typing: typing });

    return {
        state, 
        moveCaret, setCaretPosition, resetCaret, 
        refreshCaret, setIsCaretHidden, setIsTyping
    };
}

export default useCaret;