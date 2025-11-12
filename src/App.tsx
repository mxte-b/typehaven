import { useEffect, useRef, useState } from 'react'
import './assets/css/App.css'
import TypingArea from './components/TypingArea'
import { AnimatePresence, motion } from 'motion/react';
import type { RaceResult } from './types/general';
import ResultOverview from './components/ResultOverview';

function App() {
    const [currentQuote, setCurrentQuote] = useState<string>("");
    const [isRaceFinished, setIsRaceFinished] = useState<boolean>(false);
    const [raceResult, setRaceResult] = useState<RaceResult | null>(null);

    const isInitialized = useRef<boolean>(false);

    const handleRaceEnd = (r: RaceResult) => {
        console.log("Race ended. Stats: ", r);
        setIsRaceFinished(true);
        setRaceResult(r);
    }

    useEffect(() => {
        if (isInitialized.current) return;

        isInitialized.current = true;
        fetch('https://quoteslate.vercel.app/api/quotes/random?maxLength=300')
            .then(res => res.json())
            .then(data => {
                setCurrentQuote(data.quote)
            })
    }, []);

    return (
        <>
            <h1>Type Haven</h1>
            <p className='color-secondary'>Type away your day</p>
            <AnimatePresence mode="wait">
                {
                    currentQuote ? (
                        <motion.div
                            key="type-area-loaded"
                            className="test-wrapper"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            <TypingArea 
                                quote={currentQuote}
                                onRaceEnd={handleRaceEnd}
                            />
                            {
                                isRaceFinished &&
                                <ResultOverview result={raceResult}/>
                            }
                        </motion.div> 
                    ) :
                    <motion.div 
                        key="type-area-loading"
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{type: "spring", duration: 0.5}}
                        className="loader color-secondary"
                    >
                        Loading...
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default App
