import { useState } from 'react';
import Popup from '../PopUp';
import { Crown } from 'lucide-react';

export default function Leaderboard() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Crown color='var(--alt-color)' onClick={togglePopup}>Leaderboard</Crown>
      <Popup show={showPopup} onClose={togglePopup}>
        <h2>Leaderboard</h2>
      </Popup>
    </>
  );
}
