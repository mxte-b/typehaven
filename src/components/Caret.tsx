import { useEffect, useRef } from "react";
import type { CaretPosition } from "../types/general";

const Caret = ({ position }: { position: CaretPosition | null }) => {
    const caretRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!caretRef.current || !position) return;

        const targetCharRect = document.querySelector(`div[data-letter-id="${position.letterId}"]`)?.getBoundingClientRect();

        if (!targetCharRect) return;

        caretRef.current.style.transform = `translate3d(${targetCharRect.x}px, ${targetCharRect.y}px, 0px)`
    }, [position])

    return <div className="caret" ref={caretRef}/>
}

export default Caret;