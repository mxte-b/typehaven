import { useEffect, useRef, useState } from 'react'
import './assets/css/App.css'
import TypingArea from './components/TypingArea'

function App() {
    const [currentQuote, setCurrentQuote] = useState<string>("");
    const isInitialized = useRef<boolean>(false);

    useEffect(() => {
        if (isInitialized.current) return;

        isInitialized.current = true;
        fetch('https://api.quotable.io/random?minLength=150&maxLength=300')
            .then(res => res.json())
            .then(data => {
                setCurrentQuote(data.content)
            })
    }, [])

    return (
        <>
            <h1>Type Haven</h1>
            <p className='color-secondary'>Type away your day</p>
            <TypingArea quote={currentQuote}/>
        </>
    )
}

export default App
