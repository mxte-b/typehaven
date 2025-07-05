import { useEffect, useRef, useState, type ClipboardEventHandler, type FocusEventHandler, type FormEventHandler, type KeyboardEventHandler } from "react"
import splitText from "../helpers/SplitText"
import type { CaretPosition } from "../types/general";
import Caret from "./Caret";

const TypingArea = ({ quote }: { quote: string }) => {

    const [currentPosition, setCurrentPosition] = useState<CaretPosition>({ wordId: 0, letterId: 0});

    const inputRef = useRef<HTMLInputElement>(null);
    const isInitialized = useRef<boolean>(false);
    const lastInputValue = useRef<string>("");

    // Event listeners
    const inputHandler: FormEventHandler<HTMLInputElement> = (e) => {
        const text = (e.target as HTMLInputElement).value;
        const delta = text.length - lastInputValue.current.length;
        
        // If delta is bigger than one, or it is zero, than it is pasted
        if (delta > 1 || delta == 0) {
            (e.target as HTMLInputElement).value = lastInputValue.current;
            return;
        }
        // Check new letter correctness
        else if (delta > 0) {
            console.log("Checking")
            const key = text[text.length - 1]
            const quoteChar = quote[currentPosition.letterId]

            // console.log(key)
        }
        // Remove active classes from inactive characters
        else {
            console.log("remove")
        }
        
        console.log(text, delta)
        
        // Toggle character state based on correctness

        // Update caret position
        setCurrentPosition(prev => {
            const newPosition: CaretPosition = { wordId: prev.wordId, letterId: prev.letterId + delta };
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
    }, [])

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