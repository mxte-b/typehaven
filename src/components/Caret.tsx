import { useEffect } from "react";
import type { CaretPosition } from "../types/general";

const Caret = ({ position }: { position: CaretPosition }) => {
    useEffect(() => {
        console.log("new position: " + position.letterId)
    }, [position])

    return <div className="caret"/>
}

export default Caret;