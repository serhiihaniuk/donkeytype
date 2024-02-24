export default function Stats({ result, setStatus }) {
  return (
    <div>
      <p>Stats</p>
      <p>WPM: {result}</p>
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
