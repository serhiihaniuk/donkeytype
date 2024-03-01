import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import wordsData from '@/data/words';
import styles from './TypeBox.module.css';
import CapsLockPopup from './CapsLockPopup';
import { ConfigContext } from '@/context/ConfigContext';
import { StatusContext } from '@/context/StatusContext';

const shuffleArray = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};
function capitalize(words, probability = 0.35) {
  return words.map((word) =>
    Math.random() < probability
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word
  );
}

const wordsArr = shuffleArray(wordsData)

export default function TypeBox({ setResult }) {
  const [config] = useContext(ConfigContext);
  const [status, setStatus] = useContext(StatusContext);

  const [words, setWords] = useState(wordsArr);

  const wordSpanRefs = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map(() => ({ error: false, ref: React.createRef() })),
    [words]
  );

  const inputRef = useRef(null);
  const [currInput, setCurrInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);

  const generateObject = () => {
    const result = {};
    words.forEach((_, i) => {
      result[i] = {};
    });
    return result;
  };

  const [capsLocked, setCapsLocked] = useState(false);

  const [history, setHistory] = useState(generateObject);

  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  const [liveWPM, setLiveWPM] = useState(0);

  const calculateWPM = (t) => {
    const chars = document.querySelectorAll('.correct-char').length;
    const wpm = ((chars / t) * 60) / 5;

    return wpm;
  };

  const start = () => {
    inputRef.current.focus();
    setStatus('started');
    const timeOut = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer + 1;
        const wpm = Math.round(calculateWPM(newTimer));
        setLiveWPM(wpm);

        if (newTimer > config.time) {
          setResult(Math.round(calculateWPM(prevTimer)));
          clearInterval(timeOut);
          finish();
        }
        return newTimer;
      });
    }, 1000);
    intervalRef.current = timeOut;
  };

  const finish = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setStatus('finished');
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setLiveWPM(0);
    setCurrChar('');
    setCurrInput('');
    setCurrCharIndex(-1);
    setCurrWordIndex(0);
    setInputWordsHistory({});
    setStatus('waiting');
    setHistory(generateObject);
    setWords(shuffleArray(words));
  };

  useEffect(() => {
    if (config.capitals) {
      setWords(capitalize(shuffleArray(words)));
    } else {
      setWords(shuffleArray(wordsData));
    }
  }, [config]);

  const [currChar, setCurrChar] = useState('');

  const [inputWordsHistory, setInputWordsHistory] = useState({});

  const handleInput = () => {
    if (status === 'waiting') {
      start();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    checkCorrect();
  }, [currWordIndex]);

  const checkCorrect = () => {
    for (const wordIdx in history) {
      if (
        Object.values(history[wordIdx]).some(
          (value) => value === false || value === undefined
        ) ||
        inputWordsHistory[wordIdx]?.length > words[wordIdx].length
      ) {
        wordSpanRefs[wordIdx].error = true;
      } else {
        wordSpanRefs[wordIdx].error = false;
      }
    }
  };

  const updateInput = (e) => {
    setCurrInput(e.target.value);
    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

  const handleFocus = (isFocus: boolean) => {
    setIsFocused(isFocus);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    const keyCode = e.keyCode;
    setCapsLocked(e.getModifierState('CapsLock'));

    //tab
    if (keyCode === 9) {
      e.preventDefault();
      reset();
      return;
    }

    // backspace
    if (keyCode === 8) {
      // jump to previous word if there is an error
      if (currCharIndex < 0 && wordSpanRefs[currWordIndex - 1].error) {
        e.preventDefault();
        setCurrWordIndex(currWordIndex - 1);
        setCurrCharIndex(inputWordsHistory[currWordIndex - 1].length - 1);
        setCurrInput(inputWordsHistory[currWordIndex - 1]);
        return;
      }

      if (currCharIndex < 0) {
        return;
      }

      setCurrCharIndex(currCharIndex - 1);
      setCurrChar('');

      delete history[currWordIndex][currCharIndex];
      return;
    }

    // spacebar
    if (keyCode === 32) {
      setCurrInput('');
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      return;
    }
    // disabling rest of keys
    if (
      !(keyCode >= 48 && keyCode <= 57) && // Numbers
      !(keyCode >= 65 && keyCode <= 90) && // Uppercase letters
      !(keyCode >= 97 && keyCode <= 122) // Lowercase letters
    ) {
      e.preventDefault();
      return;
    }

    setCurrCharIndex(currCharIndex + 1);
    setCurrChar(key);
  };

  const getCharClassName = (wordIdx, charIdx, char, word) => {
    if (history[wordIdx][charIdx] === true) {
      if (
        wordIdx === currWordIndex &&
        charIdx === word.length - 1 &&
        charIdx === currCharIndex
      ) {
        return 'correct-char caret-right';
      }
      return 'correct-char';
    }
    if (history[wordIdx][charIdx] === false) {
      if (
        wordIdx === currWordIndex &&
        charIdx === word.length - 1 &&
        charIdx === currCharIndex
      ) {
        return 'error-char caret-right';
      }
      return 'error-char';
    }
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar) {
      if (char === currChar) {
        history[wordIdx][charIdx] = true;
        return 'correct-char';
      } else {
        history[wordIdx][charIdx] = false;
        return 'error-char';
      }
    } else {
      if (wordIdx < currWordIndex) {
        history[wordIdx][charIdx] = undefined;
      }
    }
    if (wordIdx === currWordIndex) {
      if (charIdx === currCharIndex + 1) {
        return 'current-char';
      }
    }
  };

  const getWordClassName = (wordIdx: number) => {
    const cls = ['word'];
    if (currWordIndex === wordIdx) {
      cls.push('active');
    }
    if (wordSpanRefs[wordIdx].error === true) {
      cls.push('error');
    }
    return cls.join(' ');
  };

  const getExtraCharsDisplay = (word, i) => {
    const input = inputWordsHistory[i] || currInput.trim();

    if (i > currWordIndex) {
      return null;
    }

    if (input.length <= word.length) {
      return null;
    } else {
      const extra = input.slice(word.length, input.length).split('');
      return extra.map((c: string, idx: number) => {
        const isLastChar = idx === extra.length - 1 && i === currWordIndex;
        return (
          <span
            key={idx}
            className={isLastChar ? 'error-char caret-right' : 'error-char'}
          >
            {c}
          </span>
        );
      });
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.words}
        style={{
          opacity: isFocused ? '1' : '.25',
          filter: isFocused ? '' : 'blur(4px)',
        }}
        onClick={() => inputRef.current.focus()}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={wordSpanRefs[i].ref}
            className={getWordClassName(i)}
          >
            {word.split('').map((char: string, idx: number) => (
              <span
                key={'word' + idx}
                className={getCharClassName(i, idx, char, word)}
              >
                {char}
              </span>
            ))}
            {getExtraCharsDisplay(word, i)}
          </span>
        ))}
      </div>
      {!isFocused && (
        <div className={styles.startSign}>Click here to start typing</div>
      )}
      <input
        key="hidden-input"
        ref={inputRef}
        type="text"
        className={styles.hiddenInput}
        onKeyDown={(e) => handleKeyDown(e)}
        value={currInput}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        onInput={handleInput}
        onChange={(e) => updateInput(e)}
      />
      {status === 'started' && (
        <>
          <p>Live WPM: {liveWPM}</p>
          <p>{config.time - timer}</p>
        </>
      )}
      <CapsLockPopup open={capsLocked} />
    </div>
  );
}
