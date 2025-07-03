export default function splitText(text: string) {
    const words = text.split(" ");

    return (
        <>
            {words.map((w, i) => 
                <div className="word" key={i}>{w.split('').map((char, j) => <div className="letter" key={j}>{char}</div>)}</div>
            )}
        </>
    )
}