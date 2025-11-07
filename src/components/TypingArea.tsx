import { useEffect, useRef, useState } from "react"
import splitText from "../helpers/SplitText"
import Caret from "./Caret";
import TextInput from "./TextInput";
import useCaret from "../hooks/useCaret";
import type { RaceResult } from "../types/general";
import useRaceStats from "../hooks/useRaceStats";

const TypingArea = (
    { 
        quote,
        onRaceEnd
    }: 
    { 
        quote: string,
        onRaceEnd: (results: RaceResult) => void
    }) => {

    // States
    const [isEnabled, setIsEnabled] = useState<boolean>(true);

    // References
    const timeoutIdRef = useRef<number | null>(null);

    // Hooks
    const { 
        state, 
        moveCaret, refreshCaret, 
        setIsCaretHidden, setIsTyping
    } = useCaret();

    const { 
        stats,
        startRace,
        endRace,
        recordInput
    } = useRaceStats();

    // Helper functions
    const getCharacterElement = (c: number) => {
        return document.querySelector(`div[data-letter-id="${c}"]`);
    }

    const scheduleCaretBlinkAnimation = () => {
        // Update typing status
        if (!state.typing) {
            setIsTyping(true);
        }

        // Clear previous timeout
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

        // Start caret blink 300ms after last input
        timeoutIdRef.current = setTimeout(() => {
            setIsTyping(false);
            timeoutIdRef.current = null;
        }, 250);
    }

    const handleTextInput = (c: string) => {
        if (!isEnabled) return;

        // Start race
        if (!stats.startTime) startRace();

        scheduleCaretBlinkAnimation();

        // Check correctness
        const el = getCharacterElement(state.position.letterId);
        const quoteChar = quote[state.position.letterId];
        const isCorrect = c == quoteChar;

        // Record the keystroke
        recordInput(isCorrect);
        
        // Update character DOM classes
        if (isCorrect) {
            el?.classList.remove("incorrect");
            el?.classList.add("correct");
        }
        else {
            el?.classList.remove("correct");
            el?.classList.add("incorrect");
        }
    }

    const handleTextRemove = (delta: number) => {
        if (!isEnabled) return;

        scheduleCaretBlinkAnimation();

        // Single character delete
        if (delta == -1) {
            const el = getCharacterElement(state.position.letterId-1);
            el?.classList.remove("correct", "incorrect");
        }
        // Entire word delete
        else {
            const newIndex = state.position.letterId + delta;

            // Go through all removed letters and remove classes
            for (let i = newIndex; i < state.position.letterId; i++) {
                const el = getCharacterElement(i);
                el?.classList.remove("correct", "incorrect");
            }
        }
    }

    const getRaceResults: () => RaceResult = () => {

        if (!stats.startTime) {
            throw new Error("Race didn't start yet.");
        }

        if (!stats.endTime) {
            throw new Error("Race didn't conclude yet.");
        }

        const timeInSeconds = (stats.endTime - stats.startTime) / 1000;
        const timeInMinutes = timeInSeconds / 60;
        const accuracy = stats.correct / stats.total;
        const wpmRaw = (stats.total / 5) / timeInMinutes;

        return {
            accuracy: accuracy,
            correctLetters: stats.correct,
            incorrectLetters: stats.incorrect,
            timeInSeconds: timeInSeconds,
            totalLetters: stats.total,
            wpm: wpmRaw * accuracy,
            wpmRaw: wpmRaw
        };
    }

    // Handle race end (after stats have updated)
    useEffect(() => {
        if (!stats.endTime) return;

        // Pass results to parent component
        onRaceEnd(getRaceResults());
    }, [stats.endTime]);

    // Responsive caret
    useEffect(() => {
        window.addEventListener("resize", refreshCaret);

        return () => window.removeEventListener("resize", refreshCaret);
    }, []);

    // Update caret after quote load
    useEffect(() => {
        if (!quote) return;

        setTimeout(() => {
            // Update caret's position
            refreshCaret();

            // Make caret visible after adjusting to correct position (150ms transition)
            setTimeout(() => setIsCaretHidden(false), 150);
        } , 200);
    }, [quote]);

    return (
        <div className="typing-test">
            <TextInput 
                enabled={isEnabled}
                onInput={handleTextInput}
                onRemove={handleTextRemove}
                onCaretShouldUpdate={(delta: number) => {
                    // End the race if the user reaches the end
                    if (state.position.letterId + delta == quote.length) {
                        // End the race
                        endRace();

                        // Disable the text input
                        setIsEnabled(false);
                    }
                    // Don't move the caret if it would be past the end
                    else if (state.position.letterId + delta > quote.length) {
                        return;
                    }

                    // Move caret by delta
                    moveCaret(delta);
                }}
            />
            <div className="text-container color-secondary">
                { splitText(quote) }
            </div>

            <Caret state={state}/>
        </div>
    )
}

export default TypingArea