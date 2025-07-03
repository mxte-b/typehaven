import { useEffect, useRef, useState } from "react"
import splitText from "../helpers/SplitText"
import type { CaretPosition } from "../types/general";
import Caret from "./Caret";

const TypingArea = ({ quote }: { quote: string }) => {

    const [currentPosition, setCurrentPosition] = useState<CaretPosition>({ wordId: 0, letterId: 0});

    const inputRef = useRef<HTMLInputElement>(null);
    const isInitialized = useRef<boolean>(false);

    useEffect(() => {
        if (!inputRef.current || isInitialized.current) return;

        isInitialized.current = true;

        // Attach focus to the text input
        inputRef.current.focus();

        // Attach event listener to the text input
        const keyPressListener: (e: KeyboardEvent) => any = (e) => {
            setCurrentPosition(prev => {
                const newPosition: CaretPosition = { wordId: prev.wordId, letterId: prev.letterId + 1 };
                return newPosition
            })
        }

        inputRef.current.addEventListener("keypress", keyPressListener)

        // Return cleanup function
        return () => {
            inputRef.current?.removeEventListener("keypress", keyPressListener)
        }
    }, [])

    return (
        <div className="typing-test">
            <input type="text" ref={inputRef} className="text-input" id="textInput" autoComplete="off" autoCapitalize="off" autoCorrect="off" data-gramm="false" data-enable-grammarly="false" spellCheck="false" />
            <div className="text-container color-secondary">
                { splitText(quote) }
            </div>
            <Caret position={currentPosition}/>
        </div>
    )
}

export default TypingArea