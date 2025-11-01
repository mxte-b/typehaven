import { useEffect, useRef, useState, type ClipboardEventHandler, type FocusEventHandler, type FormEventHandler, type KeyboardEventHandler } from "react"
import splitText from "../helpers/SplitText"
import type { CaretPosition } from "../types/general";
import Caret from "./Caret";

const TypingArea = ({ quote }: { quote: string }) => {

    const [currentPosition, setCurrentPosition] = useState<CaretPosition | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const isInitialized = useRef<boolean>(false);
    const lastInputValue = useRef<string>("");

    const getCharacterElement = (c: number) => {
        return document.querySelector(`div[data-letter-id="${c}"]`);
    }

    // Event listeners
    const inputHandler: FormEventHandler<HTMLInputElement> = (e) => {
        if (!currentPosition) return;

        const text = (e.target as HTMLInputElement).value;
        const delta = text.length - lastInputValue.current.length;
        
        // If delta is bigger than one, or it is zero, than it is pasted
        if (delta > 1 || delta == 0) {
            (e.target as HTMLInputElement).value = lastInputValue.current;
            return;
        }

        // Check new letter correctness
        else if (delta > 0) {
            const el = getCharacterElement(currentPosition.letterId);
            const key = text[text.length - 1];
            const quoteChar = quote[currentPosition.letterId];
            
            if (key == quoteChar) {
                el?.classList.remove("incorrect");
                el?.classList.add("correct");
            }
            else {
                el?.classList.remove("correct");
                el?.classList.add("incorrect");
            }
        }
        // Remove active classes from inactive characters
        else {
            const el = getCharacterElement(currentPosition.letterId-1);
            el?.classList.remove("correct", "incorrect");
        }

        // Update caret position
        setCurrentPosition(prev => {
            const newPosition: CaretPosition | null = prev ? { wordId: prev.wordId, letterId: prev.letterId + delta } : null;
            return newPosition
        })
        
        lastInputValue.current = text
    }

    const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        if (!inputRef.current) return;

        inputRef.current.classList.add("focused")
    }

    const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        if (!inputRef.current) return;

        // inputRef.current.classList.remove("focused")
        inputRef.current.focus()
    }

    // Preventing pasting into the text input
    const pasteHandler: ClipboardEventHandler<HTMLInputElement>  = (e) => {
        e.preventDefault();
    }

    // Auto-focus on the typing area
    useEffect(() => {
        if (!inputRef.current || isInitialized.current) return;
        isInitialized.current = true;

        // Attach focus to the text input
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (!quote) return;

        setCurrentPosition({ wordId: 0, letterId: 0});
    }, [quote]);

    return (
        <div className="typing-test">
            <input 
                type="text" 
                ref={inputRef} 
                onChange={inputHandler} 
                onFocus={focusHandler}
                onBlur={blurHandler}
                onPaste={pasteHandler}
                className="text-input" 
                id="textInput" 
                autoComplete="off" 
                autoCapitalize="off" 
                autoCorrect="off" 
                data-gramm="false" 
                data-enable-grammarly="false" 
                spellCheck="false" 
            />
            <div className="text-container color-secondary">
                { splitText(quote) }
            </div>
            <Caret position={currentPosition}/>
        </div>
    )
}

export default TypingArea