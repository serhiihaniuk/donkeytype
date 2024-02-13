import React from 'react';

export default function Stats({ setIsFinished }) {
  return (
    <div>
      <p>Stats</p>
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
