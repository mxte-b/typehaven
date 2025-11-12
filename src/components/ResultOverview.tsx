import type { RaceResult } from "../types/general";
import { motion } from 'motion/react';
import LineChart from "./LineChart";

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
                    <button type="button">Restart</button>
                </div>
                <LineChart data={result.history} />
            </motion.div>
    )
}

export default ResultOverview;