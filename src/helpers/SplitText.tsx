export default function splitText(text: string) {
    const words = text.split(" ");
    let letterId = 0;

    return (
        <>
            {
            words.map((w, i) => {
                const el = <div className="word" key={i}>
                    {
                        w.split('').map((char, j) => <div className="letter" key={j} data-letter-id={letterId++}>{char}</div>)
                    }
                    <div className="word-end" key={"word-end- " + i} data-letter-id={letterId++}/>
                </div>
                return el;
            })
            }
        </>
    )
}