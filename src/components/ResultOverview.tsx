import type { RaceResult } from "../types/general";
import { motion } from 'motion/react';

const ResultOverview = ({ result }: { result: RaceResult | null }) => {
    return (
            result &&
            <motion.div 
                className="race-results"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            >
                <div className="result-category prominent">
                    <div className="category-title">WPM: </div>
                    <div className="result-value">{Math.round(result.wpm)}</div>
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
            </motion.div>
    )
}

export default ResultOverview;