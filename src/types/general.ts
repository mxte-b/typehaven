export type CaretPosition = {
    wordId: number;
    letterId: number;
}

export type CaretAction = 
    { type: "MOVE", delta: number } |
    { type: "SET", position: CaretPosition } |
    { type: "REFRESH" } |
    { type: "RESET" } |
    { type: "SET_HIDDEN", hidden: boolean} | 
    { type: "SET_TYPING", typing: boolean};

export type CaretState = {
    hidden: boolean;
    typing: boolean;
    position: CaretPosition;
    refresh: number;
}

export type StatsAction =
    { type: "START" } |
    { type: "END" } |
    { type: "INPUT", correct: boolean };

export type RaceStats = {
    correct: number;
    incorrect: number;
    total: number;
    startTime: number | null;
    endTime: number | null;
}

export type RaceResult = {
    timeInSeconds: number;
    wpmRaw: number;
    wpm: number;
    accuracy: number;
    totalLetters: number;
    correctLetters: number;
    incorrectLetters: number;
}