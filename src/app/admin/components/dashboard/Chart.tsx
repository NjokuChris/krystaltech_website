// Chart component code here

'use client';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
  title: string;
  chartData: any;
}

export default function Chart({ title, chartData }: ChartProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-gray-500 mb-4">{title}</h3>
      <Line data={chartData} />
    </div>
  );
}
