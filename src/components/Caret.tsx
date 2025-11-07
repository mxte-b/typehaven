import { useEffect, useRef } from "react";
import type { CaretState } from "../types/general";

const Caret = ({ state }: { state: CaretState}) => {
    const caretRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!caretRef.current) return;
        
        const targetCharRect = document.querySelector(`div[data-letter-id="${state.position.letterId}"]`)?.getBoundingClientRect();
        const parentRect = document.querySelector(".typing-test")?.getBoundingClientRect();
        
        if (!targetCharRect || !parentRect) return;
        
        caretRef.current.style.transform = `translate3d(${targetCharRect.x - parentRect.x}px, ${targetCharRect.y - parentRect.y}px, 0px)`
        
    }, [state]);

    return <div className={"caret" + (state.hidden ? " hidden" : "") + (state.typing ? " active" : "")} ref={caretRef}/>
}

export default Caret;