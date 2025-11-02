import { useEffect, useRef } from "react";
import type { CaretState } from "../types/general";

const Caret = ({ state }: { state: CaretState}) => {
    const caretRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!caretRef.current) return;

        const targetCharRect = document.querySelector(`div[data-letter-id="${state.position.letterId}"]`)?.getBoundingClientRect();

        if (!targetCharRect) return;

        caretRef.current.style.transform = `translate3d(${targetCharRect.x}px, ${targetCharRect.y}px, 0px)`
    }, [state]);

    return <div className="caret" ref={caretRef}/>
}

export default Caret;