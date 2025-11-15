import { useEffect, useRef } from "react"
import useCaret from "../hooks/useCaret"
import type { RaceResult } from "../types/general"
import Caret from "./Caret"

const CaretGhost = (
    {
        targetStats
    }:
    {
        targetStats: RaceResult | null
    }
) => {

    const intervalRef = useRef<number | undefined>(undefined);

    const {
        state,
        moveCaret,
        setIsCaretHidden,
        setIsTyping
    } = useCaret();

    const updateGhost = () => {
        moveCaret(1);
    }

    useEffect(() => {
        if (!targetStats) return;

        setIsCaretHidden(false);
        setIsTyping(true);

        const timeout = 60 / (targetStats.wpm * 5);

        intervalRef.current = setInterval(updateGhost, timeout * 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    return <Caret state={state} isGhost={true}/>
}

export default CaretGhost;