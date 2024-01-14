import React, { useEffect, useMemo, useRef, useState } from 'react'
import {words as wordsData} from '../../data/words'
import styles from './TypeBox.module.css'

export default function TypeBox() {
  const [wordsDict, setWordsDict] = useState(wordsData);

  const words = useMemo(() => {
    return wordsData.map((e) => e.val);
  }, [wordsDict]);

  const wordSpanRefs = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map((i) => ({error: false, ref: React.createRef()})),
    [words]
  );

  const inputRef = useRef(null)
  const [currInput, setCurrInput] = useState("");
  const [isFocused, setIsFocused] = useState(false)

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  
  const generateObject = () => {
    const result = {};
    words.forEach((item, i)=> {
      result[i] = {};
    })
    return result;
  }

  const [history, setHistory] = useState(generateObject);

  const [timer, setTimer] = useState(0)

  const [liveWPM, setLiveWPM] = useState(0);

  const calculateWPM = (t) => {
    const chars = document.querySelectorAll('.correct-char').length
    console.log(chars, timer)
    const wpm = chars / t * 60 / 5
    
    return wpm;
  };

  useEffect(() => {
    let t = 0
    const timeOut = setInterval(() => {
      setTimer(prevTimer => {
        const newTimer = prevTimer + 1;
        const wpm = Math.round(calculateWPM(newTimer));
        setLiveWPM(wpm);
        return newTimer;
      });
    }, 1000); 
    if(timer < 0){
      clearInterval(timeOut)
    }
  }, []);

  const [currChar, setCurrChar] = useState("");

  const [inputWordsHistory, setInputWordsHistory] = useState({});
  
  useEffect(() => {  
    inputRef.current.focus()
  },[])

  useEffect(() => {  
    checkCorrect()
  },[currWordIndex])

  const checkCorrect = () => {
    for (const wordIdx in history){
      if(Object.values(history[wordIdx]).some(value => 
        value === false || 
        value === undefined) ||
        inputWordsHistory[wordIdx]?.length > words[wordIdx].length){
        wordSpanRefs[wordIdx].error = true;
      } else {
        wordSpanRefs[wordIdx].error = false;
      }
    }
  }

  const updateInput = (e) => {
    setCurrInput(e.target.value);

    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

  const handleFocus = (isFocus) => {
    setIsFocused(isFocus)
  }

  const handleKeyDown = (e) => {
    // backspace
    if (e.keyCode === 8) {
      // jump to previous word if there is an error
      if(currCharIndex < 0 && wordSpanRefs[currWordIndex - 1].error){
        e.preventDefault()
        setCurrWordIndex(currWordIndex - 1)
        setCurrCharIndex(inputWordsHistory[currWordIndex - 1].length - 1)
        setCurrInput(inputWordsHistory[currWordIndex - 1])
        return
      }

      if(currCharIndex < 0){
        return
      }

      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("");

      delete history[currWordIndex][currCharIndex];
      return;
    }

    // spacebar
    if(e.keyCode === 32){
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      return;
    }

    setCurrCharIndex(currCharIndex + 1);
    setCurrChar(e.key);
  }

  const getCharClassName = (wordIdx, charIdx, char, word) => {

    if (history[wordIdx][charIdx] === true) {
      if(wordIdx === currWordIndex && charIdx === word.length - 1 && charIdx === currCharIndex){
        return "correct-char caret-right"
      }
      return "correct-char";
    }
    if (history[wordIdx][charIdx] === false) {
      if(wordIdx === currWordIndex && charIdx === word.length - 1 && charIdx === currCharIndex){
        console.log(charIdx)
        return "error-char caret-right"
      }
      return "error-char"
    }
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar){
        if (char === currChar) {
          history[wordIdx][charIdx] = true;
          return "correct-char";
        } else {
          history[wordIdx][charIdx] = false;
          return "error-char";
        }
      } else {
        if (wordIdx < currWordIndex) {
          history[wordIdx][charIdx] = undefined;
        }
      }
      if(wordIdx === currWordIndex){
        if(charIdx === currCharIndex + 1){
        
          return 'current-char'        
        }
      }
  }

  const getWordClassName = (wordIdx) => {
    let cls = ['word']
    if (currWordIndex === wordIdx) {
      cls.push('active')
    } 
    if(wordSpanRefs[wordIdx].error === true){
      cls.push('error')
    }
    return cls.join(' ')
  };

  const getExtraCharsDisplay = (word, i) => {
    let input = inputWordsHistory[i] || currInput.trim();

    if (i > currWordIndex) {
      return null;
    }

    if (input.length <= word.length) {
      return null;
    } else {
      const extra = input.slice(word.length, input.length).split("");
      return extra.map((c, idx) => {
        const isLastChar = idx === extra.length - 1 && i === currWordIndex;
        return (
        <span key={idx} className={isLastChar ? 'error-char caret-right' : 'error-char'}>
          {c}
        </span>
      )})
    }
  };

  return (
    <div className={styles.container}>
      <div 
      className={styles.words}
      style={{
        opacity: isFocused? '1' : '.25',
        filter: isFocused? '' : 'blur(4px)'
      }}
      onClick={() => inputRef.current.focus()}
      >
        {words.map((word, i) => (
          
          <span
            key={i}
            ref={wordSpanRefs[i].ref}
            className={getWordClassName(i)}
          >
            {word.split("").map((char, idx) => (
              <span
                key={"word" + idx}
                className={getCharClassName(i, idx, char, word)}
              >
                {char}
              </span>
            ))}
            {getExtraCharsDisplay(word, i)}
          </span>
        )
      )}
      </div>
      {!isFocused && <div className={styles.startSign} >Click here to start typing</div>}
      <input
        key="hidden-input"
        ref={inputRef}
        type="text"
        className={styles.hiddenInput}
        onKeyDown={(e) => handleKeyDown(e)}
        value={currInput}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        onChange={(e) => updateInput(e)}
      />
       <p>Live WPM: {liveWPM}</p>
       <p>{15 - timer}</p>
    </div>
    
  )
}
