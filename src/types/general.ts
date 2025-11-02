export type CaretPosition = {
    wordId: number;
    letterId: number;
}

export type CaretAction = 
    { type: "MOVE", delta: number } |
    { type: "SET", position: CaretPosition } |
    { type: "REFRESH" } |
    { type: "RESET" };

export type CaretState = {
    position: CaretPosition;
    refresh: number;
}