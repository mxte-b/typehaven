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
        case "HISTORY_TICK":
            if (!state.startTime) return state;
            
            const time = performance.now();
            const timeInSeconds = (time - state.startTime) / 1000;
            const timeInMinutes = timeInSeconds / 60;
            const accuracy = state.correct / state.total;
            const wpmRaw = (state.total / 5) / timeInMinutes;

            return { 
                ...state, 
                history: [
                    ...state.history, 
                    { 
                        time: time - state.startTime, 
                        wpm: wpmRaw * accuracy,
                        wpmRaw: wpmRaw
                    } 
                ]
            };
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
        endTime: null,
        history: []
    });

    const startRace = () => dispatch({ type: "START" });
    const endRace = () => {
        dispatch({ type: "HISTORY_TICK" });
        dispatch({ type: "END" });
    }
    const recordInput = (correct: boolean) => dispatch({ type: "INPUT", correct: correct }); 
    const historyTick = () => dispatch({ type: "HISTORY_TICK" });

    return {
        stats: state,
        startRace,
        endRace,
        recordInput,
        historyTick
    }
};

export default useRaceStats;