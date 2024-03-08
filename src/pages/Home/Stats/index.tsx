import Chart from "./Chart";

interface Props {
  result: number,
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}
const Stats: React.FC<Props> = ({ result, setStatus }) => {
  return (
    <div>
      <p>Stats</p>
      <p>WPM: {result.wpm}</p>
      <Chart chartData={result}></Chart>
      <button
        onClick={() => {
          setStatus('waiting');
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default Stats;