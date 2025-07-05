import { useEffect, useRef } from "react";
import type { CaretPosition } from "../types/general";

const LETTER_WIDTH = 15;

const Caret = ({ position }: { position: CaretPosition }) => {
    const caretRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!caretRef.current) return;
        caretRef.current.style.transform = `translate3d(${position.letterId * (LETTER_WIDTH + 1)}px, 0px, 0px)`
    }, [position])

    return <div className="caret" ref={caretRef}/>
}

export default Caret;