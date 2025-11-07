import { useEffect, useRef, type ClipboardEventHandler, type FocusEventHandler, type FormEventHandler } from "react";

const TextInput = (
    {
        enabled,
        onInput,
        onRemove,
        onCaretShouldUpdate
    }
    :
    {
        enabled: boolean
        onInput: (c: string) => void,
        onRemove: (delta: number) => void,
        onCaretShouldUpdate: (delta: number) => void
    }
) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const lastInputValue = useRef<string>("");

    // Event listeners
    const inputHandler: FormEventHandler<HTMLInputElement> = (e) => {
        if (!enabled) {
            e.preventDefault();
            return;
        }

        const text = (e.target as HTMLInputElement).value;
        const delta = text.length - lastInputValue.current.length;
        
        // If delta is bigger than one, or it is zero, then it is pasted
        if (delta > 1 || delta == 0) {
            (e.target as HTMLInputElement).value = lastInputValue.current;
            return;
        }

        // Letter input
        else if (delta > 0) {
            const key = text[text.length - 1];
            onInput(key);
        }
        // Letter deletion
        else {
            onRemove(delta);
        }

        // Update caret position
        onCaretShouldUpdate(delta);
        
        lastInputValue.current = text;
    }

    const focusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        if (!inputRef.current) return;

        inputRef.current.classList.add("focused")
    }

    const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
        if (!inputRef.current) return;

        inputRef.current.focus()
    }

    // Preventing pasting into the text input
    const pasteHandler: ClipboardEventHandler<HTMLInputElement>  = (e) => {
        e.preventDefault();
    }

    // Auto-focus on the typing area
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
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
    );
};

export default TextInput;