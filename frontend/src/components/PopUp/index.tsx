import React from 'react';
import styles from './Popup.module.css';
import { X } from 'lucide-react';

interface PopupProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <X className={styles.closeButton} onClick={onClose}></X>
        {children}
      </div>
    </div>
  );
};

export default Popup;
