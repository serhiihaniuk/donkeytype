import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);
interface Props {
  chartData: number[]
}

const Chart = ({ chartData }: Props) => {
  const labels = [...Array(chartData.length).keys()].slice(1);

  const options = {
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: 'origin',
        lineTension: 0.4,
        borderColor: '#f2ce83',

        pointBorderColor: '#f2ce83',
        pointBackgroundColor: '#f2ce83',
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#f2ce83',
        pointHoverBorderColor: '#f2ce83',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 5,
        data: chartData,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart;
