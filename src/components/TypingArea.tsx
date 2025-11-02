import { useEffect } from "react"
import splitText from "../helpers/SplitText"
import Caret from "./Caret";
import TextInput from "./TextInput";
import useCaret from "../hooks/useCaret";

const TypingArea = ({ quote }: { quote: string }) => {

    const {state, moveCaret, refreshCaret} = useCaret();

    const getCharacterElement = (c: number) => {
        return document.querySelector(`div[data-letter-id="${c}"]`);
    }

    const handleTextInput = (c: string) => {
        const el = getCharacterElement(state.position.letterId);
        const quoteChar = quote[state.position.letterId];
            
        if (c == quoteChar) {
            el?.classList.remove("incorrect");
            el?.classList.add("correct");
        }
        else {
            el?.classList.remove("correct");
            el?.classList.add("incorrect");
        }
    }

    const handleTextRemove = (delta: number) => {
        // Single character delete
        if (delta == -1) {
            const el = getCharacterElement(state.position.letterId-1);
            el?.classList.remove("correct", "incorrect");
        }
        // Entire word delete
        else {
            const newIndex = state.position.letterId + delta;

            for (let i = newIndex; i < state.position.letterId; i++) {
                const el = getCharacterElement(i);
                el?.classList.remove("correct", "incorrect");
            }
        }
    }

    useEffect(() => {
        if (!quote) return;
        refreshCaret();
    }, [quote]);

    return (
        <div className="typing-test">
            <TextInput 
                onInput={handleTextInput}
                onRemove={handleTextRemove}
                onCaretShouldUpdate={(delta: number) => moveCaret(delta)}
            />
            <div className="text-container color-secondary">
                { splitText(quote) }
            </div>
            <Caret state={state}/>
        </div>
    )
}

export default TypingArea