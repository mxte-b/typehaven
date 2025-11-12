import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  Filler,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ data }: { data: {time: number, wpm: number, wpmRaw: number}[] }) => {
    const componentData = useMemo<ChartData<"line">>(() => {
        return {
            datasets: [
                {
                    label: "WPM",
                    data: data.map(d => ({ x: Math.round(d.time / 1000), y: Math.round(d.wpm * 10) / 10 })),
                    tension: 0.3,
                    fill: true,
                    backgroundColor: "#6ebbda15",
                    borderColor: "#6ebbda"
                },
                {
                    label: "Raw WPM",
                    data: data.map(d => ({ x: Math.round(d.time / 1000), y: Math.round(d.wpmRaw * 10) / 10 })),
                    tension: 0.3,
                    fill: true,
                    backgroundColor: "#d7d7d715",
                    borderColor: "#808080ff",
                    segment: {
                        borderDash: [6, 6]
                    }
                }
            ]
        }
    }, [data]);
    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "linear",
                title: { 
                    display: true, 
                    text: "Time (seconds)",
                    font: { family: 'JetBrains Mono', size: 14, weight: 'bold' }
                },
                ticks: {
                    stepSize: 1
                },
                grid: {
                    color: "#232323"
                }
            },
            y: {
                title: { 
                    display: true, 
                    text: "Words Per Minute",
                    font: { family: 'JetBrains Mono', size: 14, weight: 'bold' }
                },
                grid: {
                    color: "#232323"
                }
            }
        },
        plugins: {
            legend: { display: true, labels: { font: { family: "JetBrains Mono" } } },
            tooltip: { 
                enabled: true, 
                callbacks: {
                    title: (v) => `Time: ${v[0].label}s`
                },
                intersect: false, 
                titleFont: { family: "JetBrains Mono" }, 
                bodyFont: { family: "JetBrains Mono" } 
            }
        },
    };
    
    return <div className="chart">
        <Line data={componentData} options={options} />
    </div>
}

export default LineChart;