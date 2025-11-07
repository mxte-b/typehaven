import { useReducer } from "react";
import type { RaceStats, StatsAction } from "../types/general";

const reducer = (state: RaceStats, action: StatsAction) => {
    switch (action.type) {
        case "START":
            return { ...state, startTime: performance.now() } as RaceStats;
        case "END":
            return { ...state, endTime: performance.now() } as RaceStats;
        case "INPUT":
            return { 
                ...state, 
                total: state.total + 1,
                [action.correct ? "correct": "incorrect"]: 
                    state[action.correct ? "correct": "incorrect"] + 1
            } as RaceStats;
        default:
            return state;
    }
}

const useRaceStats = () => {
    const [state, dispatch] = useReducer(reducer, {
        correct: 0,
        incorrect: 0,
        total: 0,
        startTime: null,
        endTime: null
    });

    const startRace = () => dispatch({ type: "START" });
    const endRace = () => dispatch({ type: "END" });
    const recordInput = (correct: boolean) => dispatch({ type: "INPUT", correct: correct }); 

    return {
        stats: state,
        startRace,
        endRace,
        recordInput
    }
};

export default useRaceStats;