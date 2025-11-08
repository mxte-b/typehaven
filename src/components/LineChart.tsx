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
                    data: data.map(d => ({ x: Math.round(d.time / 1000), y: d.wpm })),
                    tension: 0.3,
                    fill: true,
                    backgroundColor: "#6ebbda15",
                    borderColor: "#6ebbda"
                },
                {
                    label: "Raw WPM",
                    data: data.map(d => ({ x: Math.round(d.time / 1000), y: d.wpmRaw })),
                    tension: 0.3,
                    fill: true,
                    backgroundColor: "#6e7eda15",
                    borderColor: "#6e7edaff"
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
                    text: "Time",
                    font: { family: 'JetBrains Mono', size: 14, weight: 'bold' }
                },
                ticks: {
                    stepSize: 1,
                    callback: (v: number | string) => `${v}s`
                },
                grid: {
                    color: "#232323"
                }
            },
            y: {
                title: { 
                    display: true, 
                    text: "WPM",
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