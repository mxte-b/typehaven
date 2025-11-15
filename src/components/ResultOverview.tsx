import type { RaceResult } from "../types/general";
import { motion } from 'motion/react';
import LineChart from "./LineChart";

const ResultOverview = (
    { 
        result,
        onNewRaceButtonClicked
    }: 
    { 
        result: RaceResult | null,
        onNewRaceButtonClicked: () => void
    }) => {
    return (
            result &&
            <motion.div 
                className="race-results"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            >
                <div className="categories-wrapper">
                    <div className="result-category prominent">
                        <div className="category-title">WPM: </div>
                        <div className="result-value group">
                            <div className="whole">{Math.round(result.wpm)}</div>
                            <div className="fraction">.{(result.wpm % 1).toString().substring(2, 4)}</div>
                        </div>
                    </div>
                    <div className="result-category prominent">
                        <div className="category-title">Accuracy: </div>
                        <div className="result-value">{(result.accuracy * 100).toFixed(2)}%</div>
                    </div>
                    <div className="result-category">
                        <div className="category-title">Raw WPM: </div>
                        <div className="result-value">{Math.round(result.wpmRaw)}</div>
                    </div>
                    <div className="result-category">
                        <div className="category-title">Elapsed Time: </div>
                        <div className="result-value">{Math.round(result.timeInSeconds)}s</div>
                    </div>
                    <button type="button" className="restart color-secondary" onClick={onNewRaceButtonClicked}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
                        </svg> */}
                        <span>NEW RACE</span>
                    </button>
                </div>
                <LineChart data={result.history} />
            </motion.div>
    )
}

export default ResultOverview;