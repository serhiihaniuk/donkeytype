import React from 'react';

export default function Stats({ result, setIsFinished }) {
  return (
    <div>
      <p>Stats</p>
      <p>WPM: {result}</p>
      <button
        onClick={() => {
          setIsFinished(false);
        }}
      >
        Restart
      </button>
    </div>
  );
}
