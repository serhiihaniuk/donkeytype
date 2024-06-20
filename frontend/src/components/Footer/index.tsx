import Settings from '@/pages/Home/Settings';
import styles from './Footer.module.css';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <div className={styles.container}>
      <a href="https://github.com/j4rv1sgg/donkeytype">
        <Github height={27} width={27} color="var(--alt-color)" />
      </a>
      <Settings />
    </div>
  );
}
